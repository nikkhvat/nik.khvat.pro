import React from "react";
import Link from "next/link";
import Image from "next/image";

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
  const loaderProp = ({ src }: any) => src;

  return (
    <div key={card.id} className={styles.portfolio_cards__item}>
      <Link href={`/project/${card.id}`} target="_blank">
        <Image
          width={635.5}
          height={328}
          loader={loaderProp}
          src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${card.url}`}
          className={styles.portfolio_cards__item_photo}
          alt={`preiew for ${card.title}`}
        />

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
