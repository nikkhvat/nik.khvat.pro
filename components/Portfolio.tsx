import React, { useEffect, useState } from "react"

import { useRouter } from "next/router"

import { useTranslation } from 'next-i18next'
import Link from "next/link"
import Image from 'next/image'

import styles from "../styles/components/Portfolio.module.css"

import useWindowSize from "../hooks/useWindowsSize"

const Portfolio: React.FC<any> = ({categories}) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState(-1)

  const currentLang = router.locale
  const [width]: number[] = useWindowSize();

  const [data, setData] = useState([])

  const [limit, setLimit] = useState(4)

  const fetchProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${currentLang}`)  
    const data = await res.json()
    setData(data.projects)
  }

  useEffect(() => {
    setActiveTab(1)
    if (localStorage.limit) {
      setLimit(+localStorage.limit)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [router.locale])

  const getProjects = (limit: number) => {
    return data
      .filter((item: any) => item.categories.includes(activeTab) || activeTab === 1)
      .filter((item: any, index: number) => index < limit)
  }

  return (
    <div id="portfolio" className={styles.portfolio_screen}>
      <div className={styles.portfolio_screen__title_container}>
        <h2 className={styles.portfolio_screen__title}>Portfolio</h2>
      </div>

      <div className={styles.portfolio_screen__tabs}>
        {categories.map((item: any) => (
          <div key={item.id} onClick={() => {
            setActiveTab(item.id)
            setLimit(4)
          }}
            className={`${styles.portfolio_screen__tabs_item} ${item.id === activeTab && styles.tabs_item_active}`} >
            {item.title}
          </div>
        ))}
      </div>
      
      <div className={styles.portfolio_cards} >
        {getProjects(limit).map((element: any) => <div 
            key={element.id} 
            className={styles.portfolio_cards__item} >
              
              <Link 
                href={`/project/${element.id}`}
                target="_blank" >
                <Image
                  width={635.5}
                  height={328}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${element.url}`}
                  className={styles.portfolio_cards__item_photo} 
                  alt={`preiew for ${element.title}`} />

                <p className={styles.portfolio_cards__item_title}>{element.title}</p>
                <p className={styles.portfolio_cards__item_subtitle}> {element.sub_title} </p>
              </Link>
            </div>
        )}
      </div>

      <div className={styles.portfolio_screen__show_more_container}>

        {getProjects(limit).length > 3 && limit === 4 && <button 
          className={styles.portfolio_screen__show_more} 
          onClick={() => { 
            localStorage.limit = 10;
            setLimit(10)
            }} > 

          {t('portfolio.show_more')} 
        </button>}

        {limit > 4 && <button 
          className={styles.portfolio_screen__show_more} 
          onClick={() => { 
            localStorage.limit = 4;
            setLimit(4)
            }} > 
          {t('portfolio.show_less')}
        </button>}

      </div>
    </div>
  );
}

export default Portfolio;