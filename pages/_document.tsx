import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'
// import i18n from '../next-i18next.config'

type Props = DocumentProps & {
  // add custom document props
}

class MyDocument extends Document<Props> {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ?? "en"
    return (
      <Html lang={currentLocale}>
        <Head>
          <meta charSet='utf-8' />
          
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          
          <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500;600&family=Open+Sans&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
