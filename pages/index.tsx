import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { useTranslation } from 'next-i18next'


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router';

import Footer from '../components/Footer'
import Service from '../components/Service'
import Portfolio from '../components/Portfolio'
import About from '../components/About'
import Prewiew from '../components/Prewiew'

import github from  "../images/social_media/github.png"
import linkedin from  "../images/social_media/linkedin.png"
import instagram from  "../images/social_media/instagram.png"
import telegramm from  "../images/social_media/telegramm.png"

import footer_mail from "../images/footer/mail.png"
import footer_instagram from "../images/footer/instagram.png"
import footer_github from "../images/footer/github.png"
import footer_telergamm from "../images/footer/telergamm.png"

type Props = {
  // Add custom props here
}


const Homepage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const companies = ["Sber Service", "Croc", "Qiwi", "ItHub", "VkDevLab"]

  const skils = [
    { categoryName: "Front-end", names: "TypeScript, React, Redux/ToolKit, Vue/Vuex, Ant.d", },
    { categoryName: "Back-end",  names: "Postgre/MySQL, MongoDB, Go/Gin/Gorm, Node/Express/Nest, Python/Flask", },
    { categoryName: "Tools",     names: "Github CI/CD, Nginx/Brotly, Apache Kafka, Swagger" },
    { categoryName: "Testing",   names: "Selenium, Mocha, jest", }
  ]

  const services = {
    ru: [
      { size: "small",  name: "Создание сайтов", sub: null },
      { size: "large",  name: "Создание расширений для браузеров", sub: "Chrome, Firefox"},
      { size: "normal", name: "Мобильная разработка", sub: "React Native"},
      { size: "normal", name: "Создание веб-приложений", sub: "PWA, SPA, SSR"},
      { size: "small",  name: "Разработка back-end", sub: null},
      { size: "large",  name: "Создание парсеров/скраперов сайтов", sub: "GoLang, NodeJs, Python3"}
    ],
    en: [
      { size: "small",  name: "Website development", sub: null },
      { size: "large",  name: "Development of browser extensions", sub: "Chrome, Firefox", },
      { size: "normal", name: "Mobile development", sub: "React Native", },
      { size: "normal", name: "Web Aplication", sub: "PWA, SPA, SSR", },
      { size: "small",  name: "Parsers", sub: null, },
      { size: "large",  name: "Back-end development and support", sub: "Node, Nest, Golang, Gin, Fiber", },
  ]}

  const linkContactsWithMe = [
    { link: "https://github.com/nik19ta/", icon: github, alt: "github" },
    { link: "https://www.linkedin.com/in/nikita-khvatov-b9a780245/", icon: linkedin, alt: "linkedin" },
    { link: "https://www.instagram.com/nik19ta.me/", icon: instagram, alt: "instagram" },
    { link: "https://t.me/nik19ta", icon: telegramm, alt: "telergamm" },
  ]

  const linkContactsWithMeFooter = [
    {
      link: "mailto:nik19ta.me@gmail.com",
      text: "nik19ta.me@gmail.com",
      icon: footer_mail,
      alt: "mail"
    },
    {
      link: "https://www.instagram.com/nik19ta.me/",
      text: "@nik19ta.me",
      icon: footer_instagram,
      alt: "instagram"
    },
    {
      link: "https://github.com/nik19ta/",
      text: "github.com/nik19ta",
      icon: footer_github,
      alt: "github"
    },
    {
      link: "https://t.me/nik19ta",
      text: "@nik19ta",
      icon: footer_telergamm,
      alt: "telergamm"
    },
  ]

  const linksFooter = [
    { offset: -100, duration: 300, name: t('menu.main'), to: "prewiew" },
    { offset: 0, duration: 300, name: "ABOUT", to: "about" },
    { offset: -100, duration: 300, name: "Portfolio", to: "portfolio" },
    { offset: -100, duration: 300, name: "Services", to: "service" }
  ]

  const changeTo = router.locale === 'en' ? 'de' : 'en'


  return (
    <div className={styles.container}>
      <Prewiew linkContactsWithMe={linkContactsWithMe} />
      <About companies={companies} skils={skils} />
      <Portfolio />
      <Service services={services} />
      <Footer linksFooter={linksFooter} linkContactsWithMe={linkContactsWithMeFooter} />
    </div>
  )
}


export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale ?? 'en', ['common']),
  },
})

export default Homepage