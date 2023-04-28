import React, { useEffect } from "react";
import Head from 'next/head'
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { InferGetStaticPropsType } from "next";

import styles from "../../styles/Project.module.css";

import Storage from "../../utils/storage"

const Project: React.FC<InferGetStaticPropsType<any>> = (_props) => {
  const { t } = useTranslation("common");

  const loaderProp = ({ src }: { src: any }) => {
    return src;
  };

  const data = _props.data;

  useEffect(() => {
    const token = Storage.get("token");

    if (token) return

    const requestOptions: any = { method: 'PUT', redirect: 'follow' };

    fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/projects/${data.id}`, requestOptions)
  })

  return (
    <div className={styles.main}>
      <Head>
        <title>{data.title}</title>
        <meta name='description' content={data.description} />
      </Head>

      <div className={styles.description}>
        <div className={styles.header}>
          <h1
            className={`${data.title.length > 11 && styles.card__title_small}`}
          >
            {data.title}
          </h1>
          <div className={styles.header__line}></div>
        </div>

        <p className={styles.description_text}>
          {data.description.split("\\n").map((item: any, idx: number) => (
            <span key={`text-${idx}`}>
              {" "}
              {item} <br />{" "}
            </span>
          ))}
        </p>

        <div className={styles.cards}>
          {data.cards &&
            data.cards.map((card: any) => (
              <div key={card.title} className={styles.card}>
                <p className={styles.card__title}>{card.title}</p>
                <p className={styles.card__subtitle}>{card.sub_title}</p>
              </div>
            ))}
        </div>

        <p className={styles.main_features}>{t("portfolio.main_features")}</p>

        <ul className={styles.main_features}>
          {data.features.map((item: any) => (
            <li key={item.title}> — {item.title}</li>
          ))}
        </ul>
      </div>

      <div className={styles.photos}>
        {data.photos?.map((photo: any, i: number) => (
          <div key={photo} className={styles.image_container}>
            <Image
              loader={loaderProp}
              layout={"responsive"}
              width="0"
              height="0"
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${photo}`}
              alt={`photo ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps({ params, locale }: { params: any, locale: any}) {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/projects/${params.uuid}?lang=${locale}`);
  const data = await res.json();

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
    revalidate: 10, // In seconds
  };
}

// Generates `/project/81ee526d-beb0-4a71-a192-e2b5a9886146` and ...
export async function getStaticPaths() {

  const projectsList = []
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/projects`);
  const data = (await res.json()).data;

  for (let i = 0; i < data.length; i++) {
    const project = data[i];
    projectsList.push(project.id)
  }

  const langs = ['en', 'ru', 'ja', 'de', 'es', 'zh', 'fr', 'hi', 'kk'];
  const generatedRoutes = []

  for (let i = 0; i < projectsList.length; i++) {
    const project = projectsList[i]

    for (let j = 0; j < langs.length; j++) {
      const lang = langs[j];

      generatedRoutes.push({ params: { uuid: project }, locale: lang })
    }
  }

  return {
    paths: generatedRoutes,
    fallback: 'blocking',
  }
}

export default Project;
