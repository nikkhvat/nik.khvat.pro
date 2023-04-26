import React from "react";

import styles from "./index.module.css";

import Image from "next/image";

import { useTranslation } from "next-i18next";
import { StaticImageData } from "next/image";
import smoothScrollTo from "../../utils/scroll";

interface IFooter {
  linkContactsWithMe: {
    link: string;
    text: string;
    icon: StaticImageData;
    alt: string;
  }[];
  linksFooter: {
    name: string;
    to: string;
  }[];
}

const Footer: React.FC<IFooter> = ({ linkContactsWithMe, linksFooter }) => {
  const { t } = useTranslation("common");

  const links = [
    { to: "prewiew", title: t("menu.main") },
    { to: "about", title: t("menu.about") },
    { to: "portfolio", title: t("menu.portfolio") },
    { to: "service", title: t("menu.services") }
  ]

  return (
    <div id="concatcs" className={styles.footer}>
      <div className={styles.footer__top_line}>
        <p className={styles.footer_title}>Contacts</p>
        <div className={styles.footer__vartical_line}></div>
      </div>

      <div className={styles.footer__items}>
        <div className={`${styles.footer__item} ${styles.footer__item_about}`}>
          <h1 className={styles.footer__item_name}>Nikita Khvatov</h1>
          <p className={styles.footer__item_developer}>
            Middle full-stack Developer
          </p>
        </div>
        <div
          className={`${styles.footer__item} ${styles.contact_with_me_list}`}
        >
          {linkContactsWithMe.map((item) => (
            <div key={item.alt}>
              <Image
                className={styles.footer__item_icon}
                src={item.icon.src}
                alt={item.alt}
                height={30}
                width={30}
              />
              <a className={styles.footer__item_text} href={item.link}>
                {item.text}
              </a>
            </div>
          ))}
        </div>
        <div className={styles.footer__item_menu}>
          <div className={styles.footer_menu_list}>
            {links.map(link => (
              <button
                key={link.to}
                onClick={() => smoothScrollTo(link.to)}
                className={styles.footer_menu_list_item}
              >
                {link.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer__items_tablet}>
        <div className={styles.footer__items_tablet_left}>
          <p className={styles.footer__items_tablet_title}>{t("fullname")}</p>
          <p className={styles.footer__items_tablet_subtitle}>
            Middle full-stack Developer
          </p>

          <div className={styles.footer__items_tablet_menu}>
            <div className={styles.footer__items_tablet_menu_column}>
              {[links[0], links[1]].map(link => (
                <button
                  key={link.to}
                  onClick={() => smoothScrollTo(link.to)}
                  className={styles.footer__items_tablet_menu_row}
                >
                  {link.title}
                </button>
              ))}
              
            </div>
            <div className={styles.footer__items_tablet_menu_column}>
              {[links[2], links[3]].map(link => (
                <button
                  key={link.to}
                  onClick={() => smoothScrollTo(link.to)}
                  className={styles.footer__items_tablet_menu_row}
                >
                  {link.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer__items_tablet_right}>
          {linkContactsWithMe.map((item) => (
            <div
              key={item.alt}
              className={styles.footer__items_tablet_right_link}
            >
              <Image
                className={styles.footer__item_icon}
                src={item.icon.src}
                alt={item.alt}
                height={30}
                width={30}
              />
              <a href={item.link} className={styles.footer__item_text}>
                {item.text}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer__items_mobile}>
        <p className={styles.footer_mobile__title}>Nikita Khvatov</p>
        <p className={styles.footer_mobile__sub_title}>
          Middle full-stack Developer
        </p>

        <div className={styles.footer_mobile__collumns}>
          <div className={styles.footer__item}>
            {linkContactsWithMe.map((item) => (
              <div key={item.alt}>
                <Image
                  className={styles.footer__item_icon}
                  src={item.icon.src}
                  alt={item.alt}
                  height={30}
                  width={30}
                />
                <a href={item.link} className={styles.footer__item_text}>
                  {item.text}
                </a>
              </div>
            ))}
          </div>

          <div className={styles.footer_menu_list}>
            {linksFooter.map((link) => (
              <button
                key={link.to}
                onClick={() => smoothScrollTo(link.to)}
                className={styles.footer_menu_list_item}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
