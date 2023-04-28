import { useState } from "react";
import Image from "next/image";

import { useTranslation } from "next-i18next";

import PortfolioCard from "./Card";
import portfolioTitleImage from "../../images/portfolioTitle.svg";
import styles from "./index.module.css";

interface PortfolioProps {
  categories: { id: number; title: string }[];
  projects: {
    categories: number[]
    id: string
    subtitle: string
    title: string
    url: string
  }[]
}

const Portfolio: React.FC<PortfolioProps> = ({ categories, projects }) => {
  const { t } = useTranslation("common");
  
  const [activeTab, setActiveTab] = useState(1);
  const [limit, setLimit] = useState(4);

  const filteredProjects = projects.filter((item: any) => item.categories.includes(activeTab) || activeTab === 1);
  const limitedProjects = filteredProjects.slice(0, limit);

  return (
    <div id="portfolio" className={styles.portfolio_screen}>
      <Image
        className={styles.portfolio_title_image}
        src={portfolioTitleImage}
        alt={t("portfolio.title")}
      />
      <div className={styles.portfolio_screen__tabs}>
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setLimit(4);
            }}
            className={`${styles.portfolio_screen__tabs_item} ${
              item.id === activeTab && styles.tabs_item_active
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={styles.portfolio_cards}>
        {limitedProjects.map((element) => (
          <PortfolioCard key={element.id} card={element} />
        ))}
      </div>
      <div className={styles.portfolio_screen__show_more_container}>
        {filteredProjects.length > 3 && limit === 4 && (
          <button
            className={styles.portfolio_screen__show_more}
            onClick={() => {
              localStorage.limit = 10;
              setLimit(10);
            }}
          >
            {t("portfolio.show_more")}
          </button>
        )}
        {limit > 4 && (
          <button
            className={styles.portfolio_screen__show_more}
            onClick={() => {
              localStorage.limit = 4;
              setLimit(4);
            }}
          >
            {t("portfolio.show_less")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
