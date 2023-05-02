import React from "react";

import styles from "./index.module.css"
import { useTranslation } from "next-i18next";

interface StatisticVisitsProps {
  daysObject: {[key: string]: number},
  setStatVisits: (type: "visits" | "unique") => void
}

const StatisticVisits: React.FC<StatisticVisitsProps> = ({ daysObject, setStatVisits }) => {
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

  function fillMissingDates(data: { [key: string]: number }) {
    if (!data) return []

    const result = [];
    const now = new Date();
    now.setDate(now.getDate() + 1);
    
    const startDate = new Date();
    startDate.setDate(now.getDate() - 29);

    for (let d = startDate; d <= now; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      result.push({
        date: dateKey,
        count: data[dateKey] || 0
      });
    }

    return result;
  }

  const days = fillMissingDates(daysObject);  
  const max = findMaxCount(days)

  console.log("days", days);
  console.log("daysObject", daysObject);
  

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