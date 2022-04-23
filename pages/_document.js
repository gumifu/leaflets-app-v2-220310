import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja-JP">
        <Head>
          <meta name="application-name" content="leaflets App" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;500;900&family=Nunito&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script"
            rel="stylesheet"
          />
        </Head>
        <body className="dark:bg-gray-800 font-notojp">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
