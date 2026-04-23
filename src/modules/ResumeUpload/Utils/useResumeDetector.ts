// useResumeDetector.ts
'use client';

import { useCallback, useState } from 'react';

export type DetectResult = {
  isResume: boolean;
  extractedText: string;
  matches: string[];
  error?: string | null;
};

type MammothModule = {
  extractRawText: (opts: { arrayBuffer: ArrayBuffer }) => Promise<{ value?: string }>;
};

type PDFJSModule = {
  version?: string;
  GlobalWorkerOptions?: { workerSrc?: string };
  getDocument: (src: { data: ArrayBuffer } | ArrayBuffer) => { promise: Promise<unknown> };
};

function loadMammothFromCDN(): Promise<MammothModule> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('no-window'));
      return;
    }

    const w = window as unknown as { mammoth?: unknown };

    if (w.mammoth) {
      resolve(w.mammoth as MammothModule);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/mammoth/mammoth.browser.min.js';
    script.async = true;
    script.onload = () => {
      if ((window as unknown as { mammoth?: unknown }).mammoth) {
        resolve((window as unknown as { mammoth: unknown }).mammoth as MammothModule);
      } else {
        reject(new Error('mammoth-not-available-after-load'));
      }
    };
    script.onerror = (e) => reject(new Error(String(e)));
    document.head.appendChild(script);
  });
}

export default function useResumeDetector() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detect = useCallback(async (file: File | null): Promise<DetectResult> => {
    setError(null);
    setLoading(true);

    if (!file) {
      setLoading(false);
      return { isResume: false, extractedText: '', matches: [], error: 'no-file' };
    }

    try {
      const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
      const isDocx =
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        /\.docx$/i.test(file.name);

      if (!isPdf && !isDocx) {
        setLoading(false);
        return { isResume: false, extractedText: '', matches: [], error: 'unsupported-type' };
      }

      let extractedText = '';

      if (isPdf) {
        // dynamic import PDF.js - typed as PDFJSModule
        const pdfjsImport =
          (await import('pdfjs-dist/legacy/build/pdf.js')) as unknown as PDFJSModule;

        try {
          if (pdfjsImport.version && pdfjsImport.GlobalWorkerOptions) {
            pdfjsImport.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsImport.version}/pdf.worker.min.js`;
          }
        } catch {
          // ignore worker setting failure
        }

        const arrayBuffer = await file.arrayBuffer();
        // getDocument may return a complex object; cast to any at usage points
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const loadingTask: any = (pdfjsImport as any).getDocument({ data: arrayBuffer });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdf: any = await loadingTask.promise;

        let fullText = '';
        const numPages: number = pdf.numPages ?? 0;
        for (let p = 1; p <= numPages; p += 1) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const page: any = await pdf.getPage(p);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const content: any = await page.getTextContent();
          type PdfTextItem = { str?: string };

          const items = (content.items ?? []) as PdfTextItem[];
          const pageText = items.map((it) => (it && it.str ? it.str : '')).join(' ');

          fullText += ` ${pageText}`;
        }

        extractedText = fullText;
      } else if (isDocx) {
        // Try local mammoth import first; fallback to CDN
        let mammothModule: MammothModule | null = null;

        try {
          const imported = await import('mammoth');
          // mammoth could be default-exported
          mammothModule = (imported && (imported.default ?? imported)) as MammothModule;
        } catch {
          // fallback to CDN browser build
          mammothModule = await loadMammothFromCDN();
        }

        const arrayBuffer = await file.arrayBuffer();
        const result = await mammothModule.extractRawText({ arrayBuffer });
        extractedText = result.value ?? '';
      }

      const normalized = (extractedText || '').toLowerCase().replace(/\s+/g, ' ').trim();

      const keywords = [
        'education',
        'experience',
        'skills',
        'work experience',
        'summary',
        'objective',
        'projects'
      ];
      const matches = keywords.filter((kw) => normalized.includes(kw));

      const negativeTokens = [
        'invoice',
        'amount due',
        'bill to',
        'total due',
        'invoice no',
        'tax',
        'receipt'
      ];
      const negativesFound = negativeTokens.filter((t) => normalized.includes(t));

      // Decision rule:
      // require at least 1 positive match, no negative tokens, and some length
      const isResume = matches.length > 0 && negativesFound.length === 0 && normalized.length > 50;

      setLoading(false);
      return { isResume, extractedText, matches, error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setLoading(false);
      return { isResume: false, extractedText: '', matches: [], error: message };
    }
  }, []);

  return { detect, loading, error };
}

export const detectResumeFromText = (text: string) => {
  const raw = text || '';
  const normalized = raw.toLowerCase().trim();

  if (!normalized) {
    return { isResume: false };
  }

  const words = normalized.split(/\s+/).filter(Boolean);

  // ----------------------
  // ❌ 1. GIBBERISH CHECK
  // ----------------------
  // block random strings like: sdsdf, qwrty, zxcv
  const meaningfulWords = words.filter((word) => /[aeiou]/i.test(word) && word.length >= 3);

  if (meaningfulWords.length === 0) {
    return { isResume: false };
  }

  // ----------------------
  // ❌ 2. NON-RESUME PATTERNS
  // ----------------------

  const hasInstructionPattern =
    /(how to|step\s*\d|first,|then,|next,|finally)/i.test(normalized) || /^\d+\./m.test(raw);

  const hasInvoicePattern = /(invoice|amount due|receipt|payment|order id)/i.test(normalized);

  if (hasInstructionPattern || hasInvoicePattern) {
    return { isResume: false };
  }

  // ----------------------
  // ✅ 3. STRONG SIGNALS (at least 1 required)
  // ----------------------

  const hasJobRole =
    /(engineer|developer|manager|designer|analyst|consultant|intern|specialist|teacher|chef)/i.test(
      normalized
    );

  const hasExperience = /\b\d+\s*(years|yrs|months)\b/i.test(raw);

  const hasEmail = /\S+@\S+\.\S+/.test(raw);

  const hasPhone = /\b\d{10}\b/.test(raw);

  const hasSections = /(experience|education|skills|projects|summary|objective)/i.test(normalized);

  const strongSignal = hasJobRole || hasExperience || hasEmail || hasPhone || hasSections;

  // ----------------------
  // 🎯 FINAL DECISION
  // ----------------------

  const isResume = strongSignal && meaningfulWords.length >= 1;

  return {
    isResume
  };
};
