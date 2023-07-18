import React from "react";
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

import { StaticImageData } from "next/image";

import { github, instagram, linkedin, mail, telegramm } from "../images/images";
import Stat from "../components/Stat";

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
    { link: "mailto:hi@nik19ta.me", text: "hi@nik19ta.me", icon: mail, alt: "mail" },
    { link: "https://www.instagram.com/nik19ta.me/", text: "@nik19ta.me", icon: instagram, alt: "instagram" },
    { link: "https://github.com/nik19ta/", text: "github.com/nik19ta", icon: github, alt: "github" },
    { link: "https://t.me/nik19ta", text: "@nik19ta", icon: telegramm, alt: "telergamm" },
  ];

  const linksFooter: IFooterLinksPage[] = [ 
    { name: t("menu.main"), to: "preview" },
    { name: t("menu.about"), to: "about" },
    { name: t("menu.portfolio"), to: "portfolio" },
    { name: t("menu.services"), to: "service" }
  ];
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Nikita Khvatov</title>
        <meta name='description' content={t('description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stat />
      <Preview linkContactsWithMe={contectLinks} />
      <About companies={companies} skills={skils} />
      <Service services={services} />
      <Footer linksFooter={linksFooter} linkContactsWithMe={footerLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {

  const projectResp = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/projects?lang=${locale}`);
  const projectsData = await projectResp.json();
  
  const categoriesResp = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/projects/categories`)
  const categoriesData = await categoriesResp.json();

  return { 
    props: {
      projects: projectsData.data,
      categories: categoriesData,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
    revalidate: 10, // In seconds
  }
};

export default Homepage;
