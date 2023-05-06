import React, { useState } from "react";

import styles from "./index.module.css"
// import { useTranslation } from "next-i18next";
import {VisitDetail} from "../../../pages/admin";

interface StatisticVisitsProps {
  daysObject: { date: string, details: VisitDetail[], count: number }[]
}

const StatisticBots: React.FC<StatisticVisitsProps> = ({ daysObject }) => {
  // const { t } = useTranslation("admin");

  function findMaxCount(array: { date: string, details: VisitDetail[], count: number }[]) {
    let maxCount = 0;

    for (const item of array) {
      if (item.details.length > maxCount) {
        maxCount = item.details.length;
      }
    }

    return maxCount;
  }


  function fillMissingDates(array: { date: string, details: VisitDetail[], count: number }[]) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 29);

    const filledArray: { date: string, details: VisitDetail[], count: number }[] = [];

    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingDate = array.find((item) => item.date === dateString);

      if (existingDate) {
        filledArray.push(existingDate);
      } else {
        filledArray.push({ date: dateString, details: [], count: 0 });
      }
    }

    return filledArray;
  }

  function sortByName(array:  VisitDetail[]) {
    return array.sort((a, b) => {
      if (a.browser.toLowerCase() < b.browser.toLowerCase()) return -1;
      if (a.browser.toLowerCase() > b.browser.toLowerCase()) return 1;
      return 0;
    });
  }

  
  const [bots, setBots] = useState([
    { show: true, id: "Googlebot", name: "Google Bot", color: "#2196F3" },
    { show: true, id: "AhrefsBot", name: "Ahrefs Bot", color: "#4CAF50" },
    { show: true, id: "Vercelbot", name: "Vercel Bot", color: "#FF9800" },
    { show: true, id: "-", name: "Another Bot", color: "#9C27B0" },
  ])
  
  const getBotByName = (name: string) => {
    for (let i = 0; i < bots.length; i++) {
      const element = bots[i];
      
      console.log(element.name, name);
      if (element.id === name) return element
    }
    
    return bots[bots.length - 1]
  }

  const days = fillMissingDates(daysObject)
    .map(item => ({ 
      ...item, 
      details: sortByName(item.details).filter((item) => getBotByName(item.browser).show === true)
    }))

  console.log(days);

  const max = findMaxCount(days)

  const clickBot = (name: string) => {
    console.log("click");
    
    const arr: any = []

    for (let i = 0; i < bots.length; i++) {
      const element = bots[i];
      
      if (element.name === name) {
        arr.push({ ...element, show: !element.show })
      } else {
        arr.push(element)
      }
    }

    console.log(arr);
    
    setBots(_ => arr)
  }

  const getColor = (name: string) => {
    const colors: {[key: string]: string} = {
      "Googlebot": "#2196F3",
      "AhrefsBot": "#4CAF50",
      "Vercelbot": "#FF9800",
    }

    return colors[name] ? colors[name] : "#9C27B0"
  }

  return (
    <div className={styles.container} >
      <div className={styles.markers} >

        {bots.map(bot => (
          <button key={bot.name} className={styles.marker} onClick={() => clickBot(bot.name)} >
            <div 
              className={styles.marker__color} 
              style={{ background: bot.show === true ? bot.color : "grey"}}>
            </div>
            {bot.name}
          </button>
        ))}

      </div>  
      {days.map(item => (
        <div className={styles.item} key={item.date} style={{
          width: (100 / days.length) + "%",
          height: (100 / max) * item.details.length + "%",
          minHeight: "3px"
        }} >
          {item.details.length !== 0 ? item.details.map(detail => (
              <div
                key={detail.uid}
                className={styles.item_slice}
                style={{minHeight: (103 / max) + "px", background: getColor(detail.browser)}} ></div>
          )) : <></> }
        </div>
      ))}
    </div>
  )
}

export default StatisticBots