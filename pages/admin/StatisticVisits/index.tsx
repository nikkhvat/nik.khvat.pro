import React from "react";

import styles from "./index.module.css"
import { useTranslation } from "next-i18next";

interface StatisticVisitsProps {
  days: {
    count: number
    date: string
  }[],
  setStatVisits: (type: "visits" | "unique") => void
}

const StatisticVisits: React.FC<StatisticVisitsProps> = ({ days, setStatVisits }) => {
  const { t } = useTranslation("admin");

  const findMaxCount = (arr: { count: number, date: string }[]) => {
    let maxCount = -Infinity;

    arr.forEach(obj => {
      if (obj.count > maxCount) {
        maxCount = obj.count;
      }
    });

    return maxCount;
  }


  const max = findMaxCount(days)

  return (
    <div className={styles.container} >

      <div className={styles.buttons} >
        <button onClick={() => setStatVisits("visits")} className={styles.button} >{ t("visits") }</button>
        <button onClick={() => setStatVisits("unique")} className={styles.button_unique} >{ t("unique_visits") }</button>
      </div>
      
      {days.map(item => (
        <div className={styles.item} key={item.date} style={{
          width: (100 / days.length) + "%",
          height: (100 / max) * item.count + "%",
          minHeight: "20px"
        }} >
          <p className={styles.item_text} >{item.count}</p>
        </div>
      ))}
    </div>
  )
}

export default StatisticVisits