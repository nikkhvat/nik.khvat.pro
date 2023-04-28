import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";

type Props = DocumentProps & {
  // add custom document props
};

class MyDocument extends Document<Props> {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? "en";
    return (
      <Html lang={currentLocale} >
        <Head title="Nikita Khvatov">
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="My website about me, my services and my portfolio"
          />
          <meta
            name="keywords"
            content="React, Next, Developer, Nikita, Khvatov, Portfolio"
          />
          <meta name="author" content="Nikita Khvatov" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <meta
            property="og:image"
            content="https://nik19ta.pro/README/preview.jpg"
          />
          <meta
            property="og:description"
            content="My website about me, my services and my portfolio"
          />
          <meta property="og:title" content="Nikita Khvatov WebSite" />

          <meta name="twitter:title" content="Nikita Khvatov WebSite" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@600&family=Open+Sans&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
