import React, { useState } from "react";

import { useTranslation } from "next-i18next";
import { default as LocaleLink } from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./index.module.css";

import burger from "../../../images/mobile_menu/burger.svg";
import close from "../../../images/mobile_menu/close.svg";
import smoothScrollTo from "../../../utils/scroll";

const Menu: React.FC = () => {
  const router = useRouter();

  const { t } = useTranslation("common");
  const currentLang = router.locale;

  const [openedMenu, setOpenedMenu] = useState(false);

  const menuList = [
    { text: t("menu.about"), id: "about" },
    { text: t("menu.portfolio"), id: "portfolio" },
    { text: t("menu.services"), id: "service" },
    { text: t("menu.contacts"), id: "concatcs" },
  ];

  return (
    <div className={styles.menu}>
      <div className={styles.menu__desktop}>
        <div className={`${styles.menu__item} ${styles.full_name}`}>
          {t("fullname")}
        </div>

        <div className={styles.menu__list}>
          {menuList.map((menuItem) => 
            <button 
              key={menuItem.id} 
              onClick={() => smoothScrollTo(menuItem.id)} 
              className={styles.menu__item} 
            > 
              {menuItem.text} 
            </button>
          )}
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
              <button 
                key={menuItem.id} 
                onClick={() => smoothScrollTo(menuItem.id)} 
                className={styles.menu__mobile_item} 
              >
                {menuItem.text}
              </button>
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
