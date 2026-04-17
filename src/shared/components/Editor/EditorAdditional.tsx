import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import { Box } from '@mui/material';
import { useStyles } from './EditorStyles';
/* eslint-disable */
const EditorComponent: any = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 200 }} />
  }
);
/* eslint-enable */

interface EditorComponentProps {
  editorData: EditorState;
  onChange: (data: EditorState) => void;
  placeholder: string;
}

const EditorAdditional: React.FC<EditorComponentProps> = ({
  editorData,
  onChange,
  placeholder
}) => {
  const styles = useStyles();
  const editorRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      setEditorReady(true);
    }
  }, [editorRef.current]);

  useEffect(() => {
    if (!editorReady) return;

    const timer = setTimeout(() => {
      const editorElement = document.querySelector('.public-DraftEditor-content') as HTMLElement;
      if (editorElement) {
        editorElement.focus();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [editorReady]);

  return (
    <Box className={styles.editorWrap}>
      <EditorComponent
        ref={editorRef}
        editorState={editorData}
        onEditorStateChange={onChange}
        placeholder={placeholder}
        toolbarHidden
      />
    </Box>
  );
};

export default EditorAdditional;
