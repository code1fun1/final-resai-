import Head from 'next/head';

interface PageTitleProps {
  pageTitle: string;
}
export default function PageTitle(props: PageTitleProps) {
  const { pageTitle = 'ResAI' } = props;
  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
  );
}
