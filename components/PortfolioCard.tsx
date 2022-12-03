import React from "react"

import Link from "next/link"
import Image from 'next/image'

import styles from "../styles/components/PortfolioCard.module.css"

interface IPortfolioCard {
  key: string
  card: any
}

const PortfolioCard: React.FC<IPortfolioCard> = ({key, card}) => {
  const loaderProp =({ src }: {src: any}) => {
    return src;
  }
  
  return (
    <div key={key} className={styles.portfolio_cards__item} >
      <Link 
        href={`/project/${card.id}`}
        target="_blank" >

        <Image
          width={635.5}
          height={328}
          loader={loaderProp}
          src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${card.url}`}
          className={styles.portfolio_cards__item_photo} 
          alt={`preiew for ${card.title}`} />

        <p className={styles.portfolio_cards__item_title}>{card.title}</p>
        <p className={styles.portfolio_cards__item_subtitle}> {card.sub_title} </p>
      </Link>
    </div>
  )
}

export default PortfolioCard