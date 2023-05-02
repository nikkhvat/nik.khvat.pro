import { Html, Head, Main, NextScript } from "next/document";

import metainfode from '../public/locales/de/meta.json'
import metainfoen from '../public/locales/en/meta.json'
import metainfoes from '../public/locales/es/meta.json'
import metainfofr from '../public/locales/fr/meta.json'
import metainfohi from '../public/locales/hi/meta.json'
import metainfoja from '../public/locales/ja/meta.json'
import metainfokk from '../public/locales/kk/meta.json'
import metainfoko from '../public/locales/ko/meta.json'
import metainforu from '../public/locales/ru/meta.json'
import metainfotr from '../public/locales/tr/meta.json'
import metainfozh from '../public/locales/zh/meta.json'

const langs: {[key: string]: any} = {
  "de": metainfode,
  "en": metainfoen,
  "es": metainfoes,
  "fr": metainfofr,
  "hi": metainfohi,
  "ja": metainfoja,
  "kk": metainfokk,
  "ko": metainfoko,
  "ru": metainforu,
  "tr": metainfotr,
  "zh": metainfozh,
}

export default function Document(props: any) {
  const currentLocale = props.__NEXT_DATA__.locale ?? "en"
  
  return (
    <Html lang={currentLocale} >
      <Head title="Nikita Khvatov">
        <meta charSet="utf-8" />
        <meta name="keywords" content={langs[currentLocale]["keywords"]} />
        <meta name="author" content={langs[currentLocale]["author"]} />

        <meta
          property="og:image"
          content="https://nik19ta.pro/README/preview.jpg"
        />
        <meta property="og:description" content={langs[currentLocale]["description"]} />
        <meta property="og:title" content={langs[currentLocale]["title"]} />

        <meta name="twitter:title" content={langs[currentLocale]["title"]} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link 
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@600&family=Open+Sans&display=swap" 
          rel="stylesheet" />
      </Head>

      <body style={{ backgroundColor: "#121212" }} >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}