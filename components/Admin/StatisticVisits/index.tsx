import React from "react";

import styles from "./index.module.css"

interface StatisticVisitsProps {
  daysObject: {
    date: string, 
    count: number
  }[],
}

const StatisticVisits: React.FC<StatisticVisitsProps> = ({ daysObject }) => {

  const findMaxCount = (arr: { count: number, date: string }[]) => {
    let maxCount = -Infinity;

    arr.forEach(obj => {
      if (obj.count > maxCount) {
        maxCount = obj.count;
      }
    });

    return maxCount;
  }

  const max = findMaxCount(daysObject)

  return (
    <div className={styles.container} >
      
      {daysObject.map(item => (
        <div 
          className={styles.item} 
          title={`${item.date} - ${item.count}`}
          key={item.date} 
          style={{
            width: (100 / daysObject.length) + "%",
            height: (100 / max) * item.count + "%",
            minHeight: "3px"
          }} />
      ))}
    </div>
  )
}

export default StatisticVisits