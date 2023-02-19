import React, { useState } from "react";

import { useTranslation } from "next-i18next";
import { default as LocaleLink } from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { Link } from "react-scroll/modules";

import styles from "./index.module.css";

import burger from "../../../images/mobile_menu/burger.svg";
import close from "../../../images/mobile_menu/close.svg";

const Menu: React.FC = () => {
  const router = useRouter();

  const { t } = useTranslation("common");
  const currentLang = router.locale;

  const [openedMenu, setOpenedMenu] = useState(false);

  const menuList = [
    { text: t("menu.about"), id: "about", offset: 0 },
    { text: t("menu.portfolio"), id: "portfolio", offset: -80 },
    { text: t("menu.services"), id: "service", offset: -100 },
    { text: t("menu.contacts"), id: "concatcs", offset: 0 },
  ];

  return (
    <div className={styles.menu}>
      <div className={styles.menu__desktop}>
        <div className={`${styles.menu__item} ${styles.full_name}`}>
          {t("fullname")}
        </div>

        <div className={styles.menu__list}>
          {menuList.map((menuItem) => (
            <Link
              href={`#${menuItem.id}`}
              key={menuItem.id}
              activeClass="active"
              to={menuItem.id}
              spy={true}
              smooth={true}
              offset={menuItem.offset}
              duration={300}
            >
              <div className={styles.menu__item}>{menuItem.text}</div>
            </Link>
          ))}
        </div>

        <div className={`${styles.menu__item} ${styles.language_switch}`}>
          <LocaleLink
            className={`${styles.language_switch__item} ${
              currentLang === "en" ? styles.active : styles.inactive
            }`}
            href="/"
            locale="en"
          >
            EN
          </LocaleLink>
          <LocaleLink
            className={`
              ${styles.language_switch__item} 
              ${
                currentLang === (currentLang !== "en" ? currentLang : "RU")
                  ? styles.active
                  : styles.inactive
              }`}
            href="/"
            locale="ru"
          >
            {currentLang !== "en" ? currentLang : "RU"}
          </LocaleLink>
        </div>
      </div>

      <div className={styles.menu__mobile}>
        {!openedMenu && (
          <Image
            onClick={() => setOpenedMenu(true)}
            className={styles.menu__mobile_image}
            src={burger.src}
            height={34}
            width={34}
            alt=""
          />
        )}
        {openedMenu && (
          <Image
            onClick={() => setOpenedMenu(false)}
            className={styles.menu__mobile_image}
            src={close.src}
            height={21}
            width={21}
            alt=""
          />
        )}
        <p className={styles.name}>NIKITA KHVATOV</p>

        {openedMenu && (
          <div className={styles.menu__mobile_list}>
            {menuList.map((menuItem) => (
              <Link
                key={menuItem.id}
                activeClass="active"
                to={menuItem.id}
                spy={true}
                smooth={true}
                offset={menuItem.offset}
                duration={300}
              >
                <div className={styles.menu__mobile_item}>{menuItem.text}</div>
              </Link>
            ))}

            <div
              className={`${styles.menu__item} ${styles.language_switch_mobile}`}
            >
              <LocaleLink
                className={`${styles.language_switch__item} ${
                  currentLang === "en" ? styles.active : styles.inactive
                }`}
                href="/"
                locale="en"
              >
                EN
              </LocaleLink>
              <LocaleLink
                className={`
                ${styles.language_switch__item} 
                ${
                  currentLang === (currentLang !== "en" ? currentLang : "RU")
                    ? styles.active
                    : styles.inactive
                }`}
                href="/"
                locale="ru"
              >
                {currentLang !== "en" ? currentLang : "RU"}
              </LocaleLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
