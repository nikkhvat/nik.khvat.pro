import React, { useEffect, useState } from "react"

import Image from "next/image"

import { useRouter } from "next/router"
import { useTranslation } from 'next-i18next'

import styles from "../styles/components/Portfolio.module.css"

import PortfolioCard from "./PortfolioCard"

import portfolio from "../images/portfolioTitle.svg"

const Portfolio: React.FC<any> = ({categories}) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState(-1)

  const [data, setData] = useState([])

  const [limit, setLimit] = useState(4)

  useEffect(() => {
    setActiveTab(1)
    if (localStorage.limit) {
      setLimit(+localStorage.limit)
    }
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/projects?lang=${router.locale}`)  
      const data = await res.json()
      setData(data.data)
    }
    
    fetchProjects()
  }, [router.locale])

  const projects = (limit: number) => {
    return data
      .filter((item: any) => item.categories.includes(activeTab) || activeTab === 1)
      .filter((item: any, index: number) => index < limit)
  }

  return (
    <div id="portfolio" className={styles.portfolio_screen}>
        <Image
          className={styles.portfolio_title_image}
          src={portfolio} 
          alt={"portfolio"}          
        />

      <div className={styles.portfolio_screen__tabs}>
        {categories.map((item: any) => (
          <div 
            key={item.id} 
            onClick={() => {
              setActiveTab(item.id)
              setLimit(4)
            }}
            className={`
              ${styles.portfolio_screen__tabs_item} 
              ${item.id === activeTab && styles.tabs_item_active}`} >
            {item.title}
          </div>
        ))}
      </div>
      
      <div className={styles.portfolio_cards} >
        {projects(limit).map((element: any) => 
          <PortfolioCard 
            key={element.id} 
            card={element} />)}
      </div>

      <div className={styles.portfolio_screen__show_more_container}>

        {projects(limit).length > 3 && limit === 4 && 
          <button 
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