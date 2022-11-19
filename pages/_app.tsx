import React, { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';

import '../styles/globals.css'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
    if (loader)
      loader.style.display = 'none';
    }
}, []);

  return <Component {...pageProps} />;
}

export default appWithTranslation(App);