import React, { useEffect, useState } from "react";
import Head from 'next/head'
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { default as LocaleLink } from "next/link";

import styles from "./index.module.css";

import Storage from "../../utils/storage"
import { useRouter } from 'next/navigation';
// import ProgressBar from "../../components/Admin/Progress";
import StatisticVisits from "../../components/Admin/StatisticVisits";

// import StatisticBots from "../../components/Admin/StatisticBots"

import PlatformIcon from "../../components/Admin/PlatformIcon";
import BrowserIcon from "../../components/Admin/BrowserIcon";

type Props = {
  // Add custom props here
};

export interface VisitDetail {
  uid: string
  time_entry: string
  browser: string
  os: string
  time_leaving: string
  country: string
  unique: boolean
  ip: string
  utm: string
}

export interface SiteStats {
  total_visits: number
  total_bots: number
  avg_duration: number
  first_visits: number
  top_pages: Array<{
    url: string
    title: string
    count: number
  }>
  top_browsers: Array<{
    name: string
    count: number
  }>
  top_countries: Array<{
    name: string
    count: number
  }>
  top_os: Array<{
    name: string
    count: number
  }>
  visits_by_day: Array<{
    date: string
    count: number
  }>
}



export interface ProjectsStatData {
  [key: string]: {
    uuid: string
    count: number
    date: string
  }[]
}


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

  
  const [general, setGenerat] = useState({
    first_visits: 0
  } as SiteStats)

  const init = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/visits`, { headers })
      const data: SiteStats = (await response.json()).data
  
      setGenerat(data)
    } catch (error) {
      push(`/admin/auth`)
    }
  }

  useEffect(() => {
    if (!token) {
      push(`/admin/auth`)
    } else {
      init().then(_ => setLoad(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [push])

  const langs = [
    { locale: "en", img: "🇺🇸" },
    { locale: "ja", img: "🇯🇵" },
    { locale: "zh", img: "🇨🇳" },
    { locale: "hi", img: "🇮🇳" },
    { locale: "ru", img: "🇷🇺" },
    { locale: "de", img: "🇩🇪" },
    { locale: "fr", img: "🇫🇷" },
    { locale: "es", img: "🇮🇹" },
    { locale: "kk", img: "🇰🇿" },
    { locale: "ko", img: "🇰🇷" },
  ]

  const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours ? `${hours}h, ` : ""} ${minutes}m, ${seconds}s`;
  }

  return (
    load === true ? <div className={styles.main} >
      <Head>
        <title>Admin nik19ta.pro</title>
        <meta name='description' content="Admin nik19ta.pro" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header className={styles.header} >
        <div className={styles.container} >
          <p className={styles.header_title} >ADMIN</p>

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
        </div>
      </header>

      <main className={styles.content} >
        <p className={styles.selection_title} >{t("general_site_statistics")}</p>

        <div className={styles.general_container}>
          <div className={`${styles.grid_card} ${styles.visits}`} >
            <div className={styles.card_count_container} >
              <div className={styles.card_count} >{general.first_visits}</div>
              <div className={styles.card_title} >{t("unique_visits")}</div>
            </div>
          </div>
          {/* <div className={`${styles.grid_card} ${styles.unique_visits}`} >
            <div className={styles.card_count_container} >
              <div className={styles.card_count} >{general.unique_visits}</div>
              <div className={styles.card_title} >{(t("unique_visits"))}</div>
            </div>

            <div className={styles.card_progress} >
              <div className={styles.card_progress__nums} >
                <span 
                  className={styles.card_progress__num}
                  style={{ left: (100 / general.total_visits * general.unique_visits) + "%" }} >{(100 / general.total_visits * general.unique_visits).toFixed(0) + "%"}</span>
              </div>
              <div className={styles.card_progress__line} >
                <div
                  style={{ width: 100 / general.total_visits * general.unique_visits + "%" }}
                  className={styles.card_progress__line_fill} />
              </div>
            </div>
          </div> */}
          <div className={`${styles.grid_card} ${styles.total_bots}`} >
            <div className={styles.card_count_container} >
              <div className={styles.card_count} >{general.total_bots}</div>
              <div className={styles.card_title} >{t("total_bots")}</div>
            </div>

            <div className={styles.card_progress} >
              <div className={styles.card_progress__nums} >
                <span
                  className={styles.card_progress__num}
                  style={{ left: (100 / (general.total_visits + general.total_bots) * general.total_bots) + "%" }} >
                    {(100 / (general.total_visits + general.total_bots) * general.total_bots).toFixed(0) + "%"}
                  </span>
              </div>

              <div className={styles.card_progress__line} >
                <div 
                  style={{ width: (100 / (general.total_visits + general.total_bots) * general.total_bots) + "%" }} className={styles.card_progress__line_fill} ></div>
              </div>
            </div>
          </div>
          <div className={`${styles.grid_card} ${styles.average_time_spent}`} >
            <div className={styles.card_count_container} >
              <div className={styles.card_count} >{formatDuration(general.avg_duration)}</div>
              <div className={styles.card_title} >{t("average_time_spent")}</div>
            </div>
          </div>
          <div className={`${styles.grid_card} ${styles.first_stat}`} >
            <StatisticVisits daysObject={general.visits_by_day} />
          </div>
          <div className={`${styles.grid_card} ${styles.top_countries}`} >
            <p className={styles.card_title} >{t("top_countries")}</p>
            <div className={styles.country_container} >
              {general.top_countries ? general.top_countries.map((country) =>
                <div key={country.name} className={styles.country_line} >
                  {country.name !== "-" ?
                    <Image
                      title={country.name}
                      className={styles.countryFlag}
                      width={32}
                      height={22}
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/../icons/${country.name.toLocaleLowerCase()}.svg`}
                      alt="" /> : <span className={styles.unk} >-</span>}
                  <span className={styles.country_line_count} >{country.count}</span>
                </div>
              ) : <></>}
            </div>
          </div>
          <div className={`${styles.grid_card} ${styles.top_browsers}`} >
            <p className={styles.card_title} >{t("top_browsers")}</p>
            <div className={styles.browser_container} >

              {general.top_browsers ? general.top_browsers.map((browser) =>
                browser.name.toLowerCase().indexOf("bot") === -1 ? 
                  <BrowserIcon 
                    key={browser.name} 
                    name={browser.name} 
                    count={browser.count} /> : <></>) : <></>}
            </div>
          </div>
          <div className={`${styles.grid_card} ${styles.top_os}`} >
            <p className={styles.card_title} >{t("top_os")}</p>
            <ul className={styles.browser_container} >
              {general.top_os ? general.top_os.map((os) =>
                os.name.toLowerCase().indexOf("bot") === -1 ? 
                  <PlatformIcon 
                    key={os.name} 
                    name={os.name} 
                    count={os.count} /> : <></>) : <></>}
            </ul>
          </div>
          <div className={`${styles.grid_card} ${styles.second_stat}`} >
            {/* <StatisticBots daysObject={general.visits_by_day} /> */}
          </div>
        </div>

        <p className={styles.selection_title} >{t("pages_statistics")}</p>
        <div className={styles.cards} >
          {general.top_pages ? general.top_pages.map((page: any) =>
            <div key={page.url} className={styles.page_card} >
              {/* <picture>
                <source
                  className={styles.page_card_image}
                  type="image/avif"
                  srcSet={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${item.url}@1x.avif 1x, ${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${item.url}@2x.avif 2x`} />
                <source
                  className={styles.page_card_image}
                  type="image/webp"
                  srcSet={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${item.url}@1x.webp 1x, ${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${item.url}@2x.webp 2x`} />
                <img
                  className={styles.page_card_image}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${item.url}@1x.jpg`}
                  srcSet={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${item.url}@2x.jpg 2x`}
                  alt={`preiew for ${item.title}`} />
              </picture> */}

              <div className={styles.description} >
                <p>
                  <span className={styles.description_count} >{page.count}</span>
                  <span className={styles.description_subcount} >{(20).toFixed(0)}%</span>
                </p>
                <span className={styles.page_title} >{page.title}</span>
                <span className={styles.page_url} >{page.url}</span>
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
