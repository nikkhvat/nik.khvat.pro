import React, { useEffect, useState } from 'react';
import { appWithTranslation } from 'next-i18next';

import styles from "../styles/Loading.module.css"

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { useTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation('common')

  useEffect(() => {
    setTimeout(() => setLoading(false), 600)
  }, []);

  return loading ? <div className={styles.loading} >
  <div className={styles.container} >
    <p className={styles.name} >{t('fullname')}</p>
  </div>
</div> : <Component {...pageProps} />;
}

export default appWithTranslation(App);