import React from 'react';

import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'
import { InferGetStaticPropsType } from 'next'

import styles from "../../styles/Project.module.css"


const Project: React.FC<InferGetStaticPropsType<any>> = (_props) => {
  const { t } = useTranslation('common')


  const data = _props.data
  
  return (
    <div className={styles.main} >
      <div className={styles.description} >
        <div className={styles.header} >
          <h1 className={`${data.title.length > 11 && styles.card__title_small}`} >{data.title}</h1>
          <div className={styles.header__line} ></div>
        </div>

        <p className={styles.description_text} >
          {data.description.split('\\n').map((item: any, idx: number) => <span key={`text-${idx}`}> {item} <br/> </span>)}
        </p>

        <div className={styles.cards} >
          {data.cards && data.cards.map((card: any) => (
            <div key={card.title} className={styles.card} >
              <p className={styles.card__title} >{card.title}</p>
              <p className={styles.card__subtitle} >{card.sub_title}</p>
            </div>
          ))}
        </div>

        <p className={styles.main_features} >
          {t('portfolio.main_features')}
        </p>

        <ul className={styles.main_features} >
          {data.features.map((item: any) => (
            <li key={item.name} > — {item.name}</li>
          ))}
        </ul>
      </div>

      <div className={styles.photos} >
        {data.photos?.map((photo: any, i: number) => (
          <div key={photo} className={styles.image_container} >
            <Image 
              layout={'responsive'}
              width="0"
              height="0"
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${photo}`}
              alt={`photo ${i + 1}`} />
          </div>
        ))}
      </div>

    </div>
  )
}

export async function getServerSideProps({query, locale}: {query: any, locale: any}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${query.uuid}/${locale}`)  
  const data = await res.json()
  return { 
    props: { 
      data,
      ...await serverSideTranslations(locale ?? 'en', ['common']),
    }
  }
}

export default Project