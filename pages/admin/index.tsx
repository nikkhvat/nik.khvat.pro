import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { default as LocaleLink } from "next/link";

import styles from "./index.module.css";
import Image from "next/image";

import Storage from "../../utils/storage"
import { useRouter } from 'next/navigation';
import ProgressBar from "../../components/Admin/Progress";
import StatisticVisits from "../../components/Admin/StatisticVisits";

type Props = {
  // Add custom props here
};

export interface ProjectsStatData {
  [key: string]: {
    uuid: string
    count: number
    date: string
  }[]
}

interface Data {
  all: number
  projects: {
    count: number
    id: string
    percent: number
    subtitle: string
    title: string
    url: string
    categories: number[]
    byDays: {
      count: number,
      date: string,
      uuid: string
    }[]
  }[]
  unique: {
    by_days: {
      count: number
      date: string
    }[]
    total: number
  },
  visits: {
    by_days: {
      count: number
      date: string
    }[]
    total: number
  },
  countries: {
    count: number
    country: string
  }[],
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

  const [statVisits, setStatVisits] = useState("visits")

  const [load, setLoad] = useState(false)

  const [data, setData] = useState({
    all: 0,
    visits: {
      by_days: [],
      total: 0
    },
    unique: {
      by_days: [],
      total: 0
    },
    countries: [],
    projects: []
  } as Data)

  const loaderProp = ({ src }: { src: any }) => src;

  const getVisits = async () => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/visits`, { headers })
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
      const respProjects = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/projects`, {})
      const jsonProjects = (await respProjects.json()).data

      const respStat = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/projects`, { headers })
      const jsonStat: ProjectsStatData = (await respStat.json()).data


      const projects: any[] = []

      const sumCounts = (jsonData: ProjectsStatData): number => {
        let totalCount = 0;

        for (const key in jsonData) {
          // eslint-disable-next-line no-prototype-builtins
          if (jsonData.hasOwnProperty(key)) {
            const entries = jsonData[key];

            for (const entry of entries) {
              totalCount += entry.count;
            }
          }
        }

        return totalCount;
      }

      const allCount = sumCounts(jsonStat)

      for (let i = 0; i < jsonProjects.length; i++) {
        const elem = jsonProjects[i];
        
        let all = 0
        
        for (let i = 0; i < jsonStat[elem.id].length; i++) {
          const element = jsonStat[elem.id][i];
          all += element.count
        }

          projects.push({ 
            ...elem, 
            count: all, 
            byDays: jsonStat[elem.id],
            percent: (100 / allCount) * all
          })
      }

      setData((prev: any) => ({ ...prev, projects: projects.sort((a, b) => b.count - a.count), all: allCount }))
    } catch (error: any) {
      push(`/admin/auth`)
      Storage.delete("token")
    }
  }

  const getUniqVisits = async () => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/visits/unique`, { headers })
        .then(response => response.json())
        .then(result => setData((prev: any) => ({ ...prev, unique: result.data })))
        .catch(error => console.log('error', error));
    } catch (error) {
      push(`/admin/auth`)
      Storage.delete("token")
    }
  }

  const getStatisticsByCountries = async () => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/countries`, { headers })
        .then(response => response.json())
        .then(result => setData((prev: any) => ({ ...prev, countries: result.data.sort((a: any, b: any) => b.count - a.count) })))
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
    getStatisticsByCountries()
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

  const flags: { [key: string]: string } = {
    DZ: "🇩🇿", BR: "🇧🇷", CZ: "🇨🇿", GD: "🇬🇩", KI: "🇰🇮", MX: "🇲🇽", PK: "🇵🇰", SC: "🇸🇨", TG: "🇹🇬",
    AD: "🇦🇩", BN: "🇧🇳", DK: "🇩🇰", GT: "🇬🇹", KW: "🇰🇼", FM: "🇫🇲", PW: "🇵🇼", SL: "🇸🇱", TO: "🇹🇴",
    AO: "🇦🇴", BG: "🇧🇬", DJ: "🇩🇯", GN: "🇬🇳", KG: "🇰🇬", MD: "🇲🇩", PA: "🇵🇦", SG: "🇸🇬", TT: "🇹🇹",
    AG: "🇦🇬", BF: "🇧🇫", DM: "🇩🇲", GW: "🇬🇼", LA: "🇱🇦", MC: "🇲🇨", PG: "🇵🇬", SK: "🇸🇰", TN: "🇹🇳",
    AR: "🇦🇷", BI: "🇧🇮", DO: "🇩🇴", GY: "🇬🇾", LV: "🇱🇻", MN: "🇲🇳", PY: "🇵🇾", SI: "🇸🇮", TR: "🇹🇷",
    AM: "🇦🇲", KH: "🇰🇭", EC: "🇪🇨", HT: "🇭🇹", LB: "🇱🇧", ME: "🇲🇪", PH: "🇵🇭", SB: "🇸🇧", TM: "🇹🇲",
    AU: "🇦🇺", CM: "🇨🇲", EG: "🇪🇬", HN: "🇭🇳", LS: "🇱🇸", MA: "🇲🇦", PL: "🇵🇱", SO: "🇸🇴", TV: "🇹🇻",
    AT: "🇦🇹", CA: "🇨🇦", SV: "🇸🇻", HU: "🇭🇺", LR: "🇱🇷", MZ: "🇲🇿", PT: "🇵🇹", ZA: "🇿🇦", UG: "🇺🇬",
    AZ: "🇦🇿", CV: "🇨🇻", GQ: "🇬🇶", IS: "🇮🇸", LY: "🇱🇾", MM: "🇲🇲", QA: "🇶🇦", KR: "🇰🇷", UA: "🇺🇦",
    BS: "🇧🇸", CF: "🇨🇫", ER: "🇪🇷", IN: "🇮🇳", LI: "🇱🇮", NA: "🇳🇦", RO: "🇷🇴", SS: "🇸🇸", AE: "🇦🇪",
    BH: "🇧🇭", TD: "🇹🇩", EE: "🇪🇪", ID: "🇮🇩", LT: "🇱🇹", NR: "🇳🇷", RU: "🇷🇺", ES: "🇪🇸", GB: "🇬🇧",
    BD: "🇧🇩", CL: "🇨🇱", ET: "🇪🇹", IR: "🇮🇷", LU: "🇱🇺", NP: "🇳🇵", RW: "🇷🇼", LK: "🇱🇰", US: "🇺🇸",
    BB: "🇧🇧", CN: "🇨🇳", FJ: "🇫🇯", IQ: "🇮🇶", MG: "🇲🇬", NL: "🇳🇱", KN: "🇰🇳", SD: "🇸🇩", UY: "🇺🇾",
    BY: "🇧🇾", CO: "🇨🇴", FI: "🇫🇮", IE: "🇮🇪", MW: "🇲🇼", NZ: "🇳🇿", LC: "🇱🇨", SR: "🇸🇷", UZ: "🇺🇿",
    BE: "🇧🇪", KM: "🇰🇲", FR: "🇫🇷", IL: "🇮🇱", MY: "🇲🇾", NI: "🇳🇮", VC: "🇻🇨", SZ: "🇸🇿", VU: "🇻🇺",
    BZ: "🇧🇿", CG: "🇨🇬", GA: "🇬🇦", IT: "🇮🇹", MV: "🇲🇻", NE: "🇳🇪", WS: "🇼🇸", SE: "🇸🇪", VE: "🇻🇪",
    BJ: "🇧🇯", CD: "🇨🇩", GM: "🇬🇲", JM: "🇯🇲", ML: "🇲🇱", NG: "🇳🇬", SM: "🇸🇲", CH: "🇨🇭", VN: "🇻🇳",
    BT: "🇧🇹", CR: "🇨🇷", GE: "🇬🇪", JP: "🇯🇵", MT: "🇲🇹", KP: "🇰🇵", ST: "🇸🇹", SY: "🇸🇾", YE: "🇾🇪",
    BO: "🇧🇴", HR: "🇭🇷", DE: "🇩🇪", JO: "🇯🇴", MH: "🇲🇭", MK: "🇲🇰", SA: "🇸🇦", TJ: "🇹🇯", ZM: "🇿🇲",
    BA: "🇧🇦", CU: "🇨🇺", GH: "🇬🇭", KZ: "🇰🇿", MR: "🇲🇷", NO: "🇳🇴", SN: "🇸🇳", TZ: "🇹🇿", ZW: "🇿🇼",
    BW: "🇧🇼", CY: "🇨🇾", GR: "🇬🇷", KE: "🇰🇪", MU: "🇲🇺", OM: "🇴🇲", RS: "🇷🇸", TH: "🇹🇭", PE: "🇵🇪",
    AF: "🇦🇫", AL: "🇦🇱",
  }

  const getFlag = (country: string): string => {
    return flags[country] ? flags[country] : country
  }

  return (
    load === true ? <div className={styles.main} >
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
        <div className={styles.line} >
          <div className={styles.card}>
            <div className={styles.card_count_container} >
              <div className={styles.card_count} >{data.visits.total}</div>
              <div className={styles.card_title} >{t("visits")}</div>
            </div>

            <div className={styles.card_progress} >
              <div className={styles.card_progress__nums} >
                <span className={styles.card_progress__num} >0%</span>
                <span className={styles.card_progress__num} >100%</span>
              </div>

              <div className={styles.card_progress__line} >
                <div style={{ width: 100 / Math.max(data.visits.total, data.unique.total) * data.visits.total + "%" }} className={styles.card_progress__line_fill} ></div>
              </div>
            </div>
          </div>
          <div className={styles.card} >
            <div className={styles.card_count_container} >
              <div className={styles.card_count} >{data.unique.total}</div>
              <div className={styles.card_title} >{(t("unique_visits"))}</div>
            </div>

            <div className={styles.card_progress} >
              <div className={styles.card_progress__nums} >
                <span className={styles.card_progress__num} >0%</span>
                <span className={styles.card_progress__num} >100%</span>
              </div>
              <div className={styles.card_progress__line} >
                <div
                  style={{ width: 100 / Math.max(data.visits.total, data.unique.total) * data.unique.total + "%" }}
                  className={styles.card_progress__line_fill} />
              </div>
            </div>
          </div>

          <StatisticVisits 
            setStatVisits={setStatVisits}
            days={statVisits === "visits" ? data.visits.by_days : data.unique.by_days} />
        </div>
        <div className={styles.line} >
          <div className={styles.card_full} >
            <p className={styles.card_title} >Top countries</p>
            <div className={styles.country_container} >
              {data.countries.map(country =>
                <div key={country.country} className={styles.country_line} >
                  {getFlag(country.country)} <span className={styles.country_line_count} >{country.count}</span>
                </div>
              )}
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
                    width: "calc(100% + 20px)",
                    marginLeft: "-12px",
                    marginTop: "49px"
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
