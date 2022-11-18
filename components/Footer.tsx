import React from "react";

import styles from "../styles/components/Footer.module.css"

import Image from 'next/image'

import { Link } from "react-scroll/modules";
import { useTranslation } from 'next-i18next'
import { StaticImageData } from "next/image";

interface IFooter {
  linkContactsWithMe: {
    link: string
    text: string
    icon: StaticImageData
    alt: string
  }[],
  linksFooter: {
    offset: number
    duration: number
    name: string
    to: string
  }[]
}

const Footer: React.FC<IFooter> = ({linkContactsWithMe, linksFooter}) => {
  const { t } = useTranslation('common')
  
  return (
    <div id="concatcs" className={styles.footer} >
      <div className={styles.footer__top_line} >
        <p className={styles.footer_title} >Contacts</p>
        <div className={styles.footer__vartical_line}></div>
      </div>

      <div className={styles.footer__items} >
        <div className={`${styles.footer__item} ${styles.footer__item_about}`} >
          <h1 className={styles.footer__item_name} >Nikita Khvatov</h1>
          <p className={styles.footer__item_developer} >Middle full-stack Developer</p>
        </div>
        <div className={`${styles.footer__item} ${styles.contact_with_me_list}`} >
          {linkContactsWithMe.map(item => (
            <div key={item.alt} >
              <Image 
                className={styles.footer__item_icon} 
                src={item.icon.src} 
                alt={item.alt}
                height={30}
                width={30} />
              <a className={styles.footer__item_text} href={item.link} >{item.text}</a>
            </div>
          ))}
        </div>
        <div className={styles.footer__item_menu} >
          <div className={styles.footer_menu_list} >
            <Link activeClass="active" to="prewiew" spy={true} smooth={true} offset={-100} duration={300} >
              <div className={styles.footer_menu_list_item} >{t('menu.main')}</div>
            </Link>
            <Link activeClass="active" to="about" spy={true} smooth={true} offset={0} duration={300} >
              <div className={styles.footer_menu_list_item} >{t('menu.about')}</div>
            </Link>
            <Link activeClass="active" to="portfolio" spy={true} smooth={true} offset={-100} duration={300} >
              <div className={styles.footer_menu_list_item} >{t('menu.portfolio')}</div>
            </Link>
            <Link activeClass="active" to="service" spy={true} smooth={true} offset={-100} duration={300} >
              <div className={styles.footer_menu_list_item} >{t('menu.services')}</div>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footer__items_tablet}>
        <div className={styles.footer__items_tablet_left}>
          <p className={styles.footer__items_tablet_title} >{t('fullname')}</p>
          <p className={styles.footer__items_tablet_subtitle} >Middle full-stack Developer</p>


          <div className={styles.footer__items_tablet_menu}>
            <div className={styles.footer__items_tablet_menu_column}>
              <Link activeClass="active" to="prewiew" spy={true} smooth={true} offset={-100} duration={300} >
                <div className={styles.footer__items_tablet_menu_row}>{t('menu.main')}</div>
              </Link>
              <Link activeClass="active" to="about" spy={true} smooth={true} offset={0} duration={300} >
                <div className={styles.footer__items_tablet_menu_row}>{t('menu.about')}</div>
              </Link>
            </div>
            <div className={styles.footer__items_tablet_menu_column}>
              <Link activeClass="active" to="portfolio" spy={true} smooth={true} offset={-100} duration={300} >
                <div className={styles.footer__items_tablet_menu_row}>{t('menu.portfolio')}</div>
              </Link>
              <Link activeClass="active" to="service" spy={true} smooth={true} offset={-100} duration={300} >
                <div className={styles.footer__items_tablet_menu_row}>{t('menu.services')}</div>
              </Link>
            </div>
          </div>

        </div>

        <div className={styles.footer__items_tablet_right}>
        {linkContactsWithMe.map(item => (
            <div key={item.alt} className={styles.footer__items_tablet_right_link} >
              <Image 
                className={styles.footer__item_icon} 
                src={item.icon.src} 
                alt={item.alt}
                height={30}
                width={30} />
              <a href={item.link} className={styles.footer__item_text}>{item.text}</a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer__items_mobile} >
        <p className={styles.footer_mobile__title} >Nikita Khvatov</p>
        <p className={styles.footer_mobile__sub_title} >Middle full-stack Developer</p>

        <div className={styles.footer_mobile__collumns} >
          <div className={styles.footer__item} >
          {linkContactsWithMe.map(item => (
            <div key={item.alt} >
              <Image 
                className={styles.footer__item_icon} 
                src={item.icon.src} 
                alt={item.alt}
                height={30}
                width={30} />
              <a href={item.link} className={styles.footer__item_text} >{item.text}</a>
            </div>
          ))}
          </div>

          <div className={styles.footer_menu_list} >
            {linksFooter.map(item => (
              <Link key={item.to} activeClass="active" to="prewiew" spy={true} smooth={true} offset={item.offset} duration={item.duration} >
                <div className={styles.footer_menu_list_item} >{item.name}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}

export default Footer;