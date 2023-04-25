import React from "react";

import nikita_khvatov from "../../images/nikita_khvatov_2.png";
import photo_description from "../../images/photo_description.svg"

import styles from "./index.module.css";

import { useTranslation } from "next-i18next";


interface IAbout {
  companies: string[];
  skils: {
    categoryName: string;
    names: string;
  }[];
}

const About: React.FC<IAbout> = ({ companies, skils }) => {
  const { t } = useTranslation("common");

  return (
    <div id="about" className={styles.about_screen}>
      <div className={styles.about_screen__left}>
        <p className={styles.about_screen__text}> {t("about.hello")} </p>

        <div className={styles.about_screen__line}></div>

        <div className={styles.skils_table}>
          {skils.map((item) => (
            <div key={item.categoryName} className={styles.skils_table__column}>
              <span className={styles.skils_table__column_title}>
                {item.categoryName}
              </span>

              {item.names.split(",").map((name) => (
                <span key={name} className={styles.skils_table__column_item}>
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.about_screen__skills_title}>Skills</div>
        <div className={styles.about_screen__line_down}></div>
      </div>

      <div className={styles.about_screen__right}>
        <div
          className={styles.about_screen__photo}
          style={{ backgroundImage: `url(${nikita_khvatov.src})` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.about_screen__photo_description} src={photo_description.src} alt="full-stack developer" />
        </div>

        <div className={styles.about_screen__company_list_tablet}>
          <span className={styles.about_screen__company_title_tablet}>
            Company
          </span>

          {companies.map((item) => (
            <span
              key={item}
              className={styles.about_screen__company_list__item}
            >
              {item}
            </span>
          ))}

          <div className={styles.about_screen__company_list__last_item}>
            <div className={styles.about_screen__company_list__line}></div>
            <div className={styles.about_screen__company_list__text}>
              Company
            </div>
          </div>
        </div>
      </div>

      <div className={styles.about_screen__company_list}>
        {companies.map((item) => (
          <span key={item} className={styles.about_screen__company_list__item}>
            {item}
          </span>
        ))}
        <span className={styles.about_screen__company_title}>Company</span>
      </div>
    </div>
  );
};

export default About;
