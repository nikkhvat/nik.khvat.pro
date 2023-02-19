import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PortfolioCard from "./Card";
import portfolioTitleImage from "../../images/portfolioTitle.svg";
import styles from "./index.module.css";

interface PortfolioProps {
  categories: { id: number; title: string }[];
}

const Portfolio: React.FC<PortfolioProps> = ({ categories }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(-1);
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    setActiveTab(1);
    if (localStorage.limit) {
      setLimit(+localStorage.limit);
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END}/api/projects?lang=${router.locale}`
      );
      const data = await res.json();
      setData(data.data);
    };
    fetchProjects();
  }, [router.locale]);

  const filteredProjects = data.filter(
    (item: any) => item.categories.includes(activeTab) || activeTab === 1
  );

  const projects = filteredProjects.slice(0, limit);

  return (
    <div id="portfolio" className={styles.block}>
      <Image
        className={styles.block__title_image}
        src={portfolioTitleImage}
        alt={t("portfolio.title")}
      />
      <div className={styles.block__tabs}>
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setLimit(4);
            }}
            className={`${styles.block__tabs_item} ${
              item.id === activeTab && styles.block__tabs_item_active
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={styles.block__cards}>
        {projects.map((element) => (
          <PortfolioCard key={element.id} card={element} />
        ))}
      </div>
      <div className={styles.block__show_more_container}>
        {filteredProjects.length > 3 && limit === 4 && (
          <button
            className={styles.block__show_more}
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
            className={styles.block__show_more}
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
