import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { default as LocaleLink } from "next/link";

import styles from "./index.module.css";
import Image from "next/image";

import Storage from "../../utils/storage"
import { useRouter } from 'next/navigation';
import ProgressBar from "./Progress";

type Props = {
  // Add custom props here
};

const Admin: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = (
  _props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { t } = useTranslation("admin");

  const { push } = useRouter();
  const token = Storage.get("token")


  const headers = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': "application/json"
  })

  const [load, setLoad] = useState(false)

  const [data, setData] = useState({
    visits: 0,
    unique: 0,
    projects: []
  } as any)

  const loaderProp = ({ src }: { src: any }) => src;

  const getVisits = () => {
    try {
      fetch("http://localhost:3030/api/stat/visits", { headers })
        .then(response => response.json())
        .then(result => setData((prev: any) => ({ ...prev, visits: result.data })))
        .catch(error => console.log('error', error));
    } catch (error: any) {
      push(`/admin/auth`)
      Storage.delete("token")
    }
  }

  const getProjects = async () => {
    try {
      const respProjects = await fetch("http://localhost:3030/api/projects", {})
      const jsonProjects = (await respProjects.json()).data

      const respStat = await fetch("http://localhost:3030/api/stat/projects", { headers })
      const jsonStat = (await respStat.json()).data

      const projects: any[] = []

      let allCount = 0

      for (let j = 0; j < jsonStat.length; j++) {
        const eleStat = jsonStat[j];
        allCount = allCount + eleStat.count
      }

      for (let i = 0; i < jsonProjects.length; i++) {
        const elem = jsonProjects[i];


        for (let j = 0; j < jsonStat.length; j++) {
          const eleStat = jsonStat[j];

          if (elem.id === eleStat.uuid) {
            projects.push({ ...elem, count: eleStat.count, percent: (100 / allCount) * eleStat.count })
          }
        }
      }

      setData((prev: any) => ({ ...prev, projects: projects.sort((a, b) => b.count - a.count), all: allCount }))
    } catch (error: any) {
      push(`/admin/auth`)
      Storage.delete("token")
    }
  }

  const getUniqVisits = () => {
    try {
      fetch("http://localhost:3030/api/stat/visits/unique", { headers })
        .then(response => response.json())
        .then(result => setData((prev: any) => ({ ...prev, unique: result.data })))
        .catch(error => console.log('error', error));
    } catch (error) {
      push(`/admin/auth`)
      Storage.delete("token")
    }
  }


  const init = async () => {
    getVisits()
    getUniqVisits()
    getProjects()
  }

  console.log(data);

  useEffect(() => {

    if (!token) {
      push(`/admin/auth`)
    } else {
      init()
      setLoad(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [push])

  const langs = [
    {locale: "en", img: "🇺🇸"},
    {locale: "jp", img: "🇯🇵"},
    {locale: "zh", img: "🇨🇳"},
    {locale: "hi", img: "🇮🇳"},
    {locale: "ru", img: "🇷🇺"},
    {locale: "de", img: "🇩🇪"},
    {locale: "fr", img: "🇫🇷"},
    {locale: "es", img: "🇮🇹"},
    {locale: "kk", img: "🇰🇿"},
  ]

  return (
    load === true ? <div className={styles.main} >
      <header className={styles.header} >
        <p className={styles.header_title} >Dashboard</p>

        <div className={styles.lang} >
          {langs.map(lang => 
            <LocaleLink 
              key={lang.locale} 
              className={styles.language_switch__item} 
              href="/admin" 
              locale={lang.locale} 
            > 
            {lang.img} 
            </LocaleLink>)}
        </div>
      </header>

      <main className={styles.content} >
        <p className={styles.selection_title} >{t("general_site_statistics")}</p>
        <div className={styles.line} >
          <div className={styles.card} >
            <span className={styles.card_count} >{data.visits}</span>
            <span className={styles.card_title} >{t("visits")}</span>

            <div className={styles.card_progress} >
              <div className={styles.card_progress__nums} >
                <span className={styles.card_progress__num} >0%</span>
                <span className={styles.card_progress__num} >100%</span>
              </div>

              <div className={styles.card_progress__line} >
                <div style={{ width: "100%" }} className={styles.card_progress__line_fill} ></div>
              </div>
            </div>
          </div>
          <div className={styles.card} >
            <span className={styles.card_count} >{data.unique}</span>
            <span className={styles.card_title} >{(t("unique_visits"))}</span>

            <div className={styles.card_progress} >
              <div className={styles.card_progress__nums} >
                <span className={styles.card_progress__num} >0%</span>
                <span className={styles.card_progress__num} >100%</span>
              </div>
              <div className={styles.card_progress__line} >
                <div
                  style={{ width: 100 / data.visits * data.unique + "%" }}
                  className={styles.card_progress__line_fill} />
              </div>
            </div>
          </div>
        </div>
        <p className={styles.selection_title} >{t("projects_statistics")}</p>
        <div className={styles.cards} >
          {data.projects ? data.projects.map((item: any) =>
            <div key={item.id} className={styles.project_card} >
              <Image
                className={styles.project_card_image}
                loader={loaderProp}
                width="160"
                height="120"
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${item.url}`}
                alt={`photo`}
              />

              <div className={styles.description} >
                <p>
                  <span className={styles.description_count} >{item.count}</span>
                  <span className={styles.description_subcount} >{item.percent.toFixed(1)}%</span>
                </p>
                <span className={styles.project_title} >{item.title}</span>

                <ProgressBar
                  fs={data.all}
                  sc={item.count}
                  style={{
                    width: "160px",
                    marginLeft: "-12px",
                    marginTop: "29px"
                  }} />
              </div>
            </div>) : <></>}
        </div>
      </main>
    </div> : <div></div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? "en", ["admin"])) },
});

export default Admin;
