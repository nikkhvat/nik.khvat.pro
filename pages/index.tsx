import React, { useEffect } from "react";
import Head from 'next/head'
import { useTranslation } from "next-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";

import styles from "../styles/Home.module.css";

import Footer from "../components/Footer";
import Service from "../components/Service";
import Portfolio from "../components/Portfolio";
import About from "../components/About";
import Preview from "../components/Preview";

import github from "../images/social_media/github.png";
import linkedin from "../images/social_media/linkedin.png";
import instagram from "../images/social_media/instagram.png";
import telegramm from "../images/social_media/telegramm.png";

import footerMail from "../images/footer/mail.png";
import footerInstagram from "../images/footer/instagram.png";
import footerGithub from "../images/footer/github.png";
import footerTelergamm from "../images/footer/telergamm.png";

import { StaticImageData } from "next/image";

import Storage from "../utils/storage";

type Props = {
  // Add custom props here
};

interface IServices {
  size: "small" | "large" | "normal";
  name: string;
  sub: string | null;
}

interface ISkils {
  categoryName: string
  names: string
}

interface ILinks {
  link: string
  icon: StaticImageData
  alt: string
}
interface IFooterLinks {
  link: string 
  text: string 
  icon: StaticImageData
  alt: string
}

interface IFooterLinksPage {
  name: string
  to: string
}

interface ICategories {
  id: number
  title: string
}


interface HomePageProps {
  locale: string
  projects: {
    categories: number[]
    id: string
    subtitle: string
    title: string
    url: string
  }[]
}

const Homepage: React.FC<HomePageProps> = ( _props: any) => {

  useEffect(() => {
    const isVisited = Storage.get("visit");
    const token = Storage.get("token");

    if (token) return

    const requestOptions: any = { method: 'PUT', redirect: 'follow'};

    if (!isVisited) {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/visits/unique`, requestOptions)
        .then(_ => Storage.set("visit", true))
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/visits`, requestOptions)
    }

  })

  const { t } = useTranslation("common");

  const companies: string[] = ["Sber Service", "Qiwi", "Croc", "VkDevLab", "ItHub"];

  const skils: ISkils[] = [
    { categoryName: "Front-end", names: "TypeScript, React, Redux/ToolKit, Vue/Vuex, Ant.d" },
    { categoryName: "Back-end", names: "Postgre/MySQL, MongoDB, Go/Gin/Gorm, Node/Express/Nest, Python/Flask" },
    { categoryName: "Tools", names: "Github CI/CD, Nginx/Brotly, Apache Kafka, Swagger, Selenium" },
    { categoryName: "Testing", names: "Jest, Puppeteer, Enzyme, Mocha, Gonkey" },
  ];

  const services: IServices[] = [
    { size: "small", name: t("services.website_development"), sub: null },
    { size: "large", name: t("services.development_browser_extensions"), sub: "Chrome, Firefox" },
    { size: "normal", name: t("services.mobile_development"),sub: "React Native" },
    { size: "normal", name: t("services.web_application"), sub: "PWA, SPA, SSR" },
    { size: "small", name: t("services.parsers"), sub: null },
    { size: "large", name: t("services.back_end_development"), sub: "GoLang, NodeJs, Python3" },
  ];

  const contectLinks: ILinks[] = [
    { link: "https://github.com/nik19ta/", icon: github, alt: "github" },
    { link: "https://www.linkedin.com/in/nikita-khvatov-b9a780245/", icon: linkedin, alt: "linkedin" },
    { link: "https://www.instagram.com/nik19ta.me/", icon: instagram, alt: "instagram" },
    { link: "https://t.me/nik19ta", icon: telegramm, alt: "telergamm" },
  ];

  const footerLinks: IFooterLinks[] = [
    { link: "mailto:nik19ta.me@gmail.com", text: "nik19ta.me@gmail.com", icon: footerMail, alt: "mail" },
    { link: "https://www.instagram.com/nik19ta.me/", text: "@nik19ta.me", icon: footerInstagram, alt: "instagram" },
    { link: "https://github.com/nik19ta/", text: "github.com/nik19ta", icon: footerGithub, alt: "github" },
    { link: "https://t.me/nik19ta", text: "@nik19ta", icon: footerTelergamm, alt: "telergamm" },
  ];

  const linksFooter: IFooterLinksPage[] = [
    { name: t("menu.main"), to: "preview" },
    { name: t("menu.about"), to: "about" },
    { name: t("menu.portfolio"), to: "portfolio" },
    { name: t("menu.services"), to: "service" },
  ];

  const categories: ICategories[] = [
    { id: 1, title: t("portfolio.all_projects") },
    { id: 2, title: "WEB" },
    { id: 4, title: "MOBILE" },
    { id: 3, title: "BOT" },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Nikita Khvatov</title>
        <meta name='description' content='My website about me, my services and my portfolio' />
      </Head>
      <Preview linkContactsWithMe={contectLinks} />
      <About companies={companies} skills={skils} />
      <Portfolio categories={categories} projects={_props.projects} />
      <Service services={services} />
      <Footer
        linksFooter={linksFooter}
        linkContactsWithMe={footerLinks}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/projects?lang=${locale}`);
  const projects = await res.json();

  return { 
    props: {
      projects: projects.data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
    revalidate: 10, // In seconds
  }
};

export default Homepage;