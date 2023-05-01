import React from "react";
import Link from "next/link";

import styles from "./index.module.css";

interface Card {
  id: string;
  url: string;
  title: string;
  subtitle: string;
}

interface Props {
  card: Card;
}

const PortfolioCard: React.FC<Props> = ({ card }) => {
  return (
    <div key={card.id} className={styles.portfolio_cards__item}>
      <Link href={`/project/${card.id}`} target="_blank">

        <picture>
          <source 
            className={styles.portfolio_cards__item_photo} 
            type="image/avif" 
            srcSet={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${card.url}@1x.avif 1x, ${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${card.url}@2x.avif 2x`} />
          <source 
            className={styles.portfolio_cards__item_photo} 
            type="image/webp" 
            srcSet={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${card.url}@1x.webp 1x, ${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${card.url}@2x.webp 2x`} />
          <img 
            className={styles.portfolio_cards__item_photo} 
            src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${card.url}@1x.jpg`} 
            srcSet={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${card.url}@2x.jpg 2x`} 
            alt={`preiew for ${card.title}`} />
        </picture>

        <p className={styles.portfolio_cards__item_title}>{card.title}</p>
        <p className={styles.portfolio_cards__item_subtitle}>
          {" "}
          {card.subtitle}{" "}
        </p>
      </Link>
    </div>
  );
};

export default PortfolioCard;