import * as React from "react";
import styles from "./index.module.css";

import Menu from "./Menu";

import { Link } from "react-scroll/modules";

import { useTranslation } from "next-i18next";

import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowsSize";
import { StaticImageData } from "next/image";
import IconAnimation from "./AnimatedIcon";

interface IPrewiew {
  linkContactsWithMe: {
    link: string;
    icon: StaticImageData;
    alt: string;
  }[];
}

const Prewiew: React.FC<IPrewiew> = ({ linkContactsWithMe }) => {
  const { t } = useTranslation("common");

  const [width] = useWindowSize();

  const [isTimingFullStack, setIsTimingFullStack] = useState(true);
  const [isTimingDeveloper, setIsTimingDeveloper] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTimingFullStack(false);
      setIsTimingDeveloper(true);
      setShowDeveloper(true);
    }, 1400);
    setTimeout(() => setIsTimingDeveloper(false), 2800);
  }, []);

  return (
    <div id="prewiew" className={styles.main_screen}>
      <div className={`${styles.line} ${styles.line_left}`}></div>
      <div className={`${styles.line} ${styles.line_top}`}></div>
      <div className={`${styles.line} ${styles.line_right_top}`}></div>
      <div className={`${styles.line} ${styles.line_right_bottom}`}></div>

      <Menu />

      <div className={`${styles.flipped_text__desktop} ${styles.flipped_text}`}>
        <p className={styles.flipped_text__grey}>
          Middle <br />
          {"Developer".split("").map((item, index) => (
            <span
              className={styles.half_color}
              key={`dev-${item}-${index}`}
              id={item}
            >
              {item}
            </span>
          ))}
        </p>
      </div>

      <div className={`${styles.flipped_text__mobile} ${styles.flipped_text}`}>
        <p className={styles.flipped_text__grey}>
          {"Middle".split("").map((item, index) => (
            <span
              className={styles.half_color}
              key={`mid-${item}-${index}`}
              id={item}
            >
              {item}
            </span>
          ))}
          <br />
          Developer
        </p>
      </div>

      <div className={styles.image_back}></div>

      <div className={styles.prewiew_text}>
        <p
          className={`
            ${styles.prewiew_text__small}
            ${isTimingFullStack && styles.line_1}
            ${isTimingFullStack && styles.anim_typewriter}`}
          id="typewriter_fullstack"
        >
          Full-stack
        </p>
        {showDeveloper && (
          <p
            className={`${styles.prewiew_text__large} ${
              isTimingDeveloper && styles.line_2
            } ${isTimingDeveloper && styles.anim_typewriter_2}`}
            id="typewriter_developer"
          >
            Developer
          </p>
        )}
      </div>

      <div
        className={`${styles.quote} ${width > 810 && styles.animation_quote}`}
      >
        {" "}
        {t("quote")}{" "}
      </div>

      <Link
        activeClass="active"
        to="portfolio"
        spy={true}
        smooth={true}
        offset={10}
        duration={300}
      >
        <button className={styles.btn_to_portfolio}>
          {t("prewiew.view_portfolio")}
        </button>
      </Link>

      <div id="logo" className={styles.icons_social_media}>
        <IconAnimation items={linkContactsWithMe} />
      </div>
    </div>
  );
};

export default Prewiew;
