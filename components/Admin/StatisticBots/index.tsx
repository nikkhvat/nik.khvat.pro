import React, { useState } from "react";

import styles from "./index.module.css"
// import { useTranslation } from "next-i18next";

interface Days {
  date: string,
  total: number,
  details: { 
    name: string, 
    count: number
  }[]
}

interface StatisticVisitsProps {
  daysObject: Days[]
}

const StatisticBots: React.FC<StatisticVisitsProps> = ({ daysObject }) => {
  // const { t } = useTranslation("admin");

  function findMaxCount(array: Days[]) {
    let maxCount = 0;

    for (const item of array) {
      if (item.total > maxCount) maxCount = item.total
    }

    return maxCount;
  }

  
  const [bots, setBots] = useState([
    { show: true, id: "Googlebot", name: "Google Bot", color: "#2196F3" },
    { show: true, id: "AhrefsBot", name: "Ahrefs Bot", color: "#4CAF50" },
    { show: true, id: "OtherBots", name: "Other Bots", color: "rgb(156, 39, 176)" },
  ])
  
  const getBotByName = (name: string) => {
    for (let i = 0; i < bots.length; i++) {
      const element = bots[i];
      
      if (element.id === name) return element
    }
    
    return bots[bots.length - 1]
  }

  const days = daysObject.map(item => ({ 
      ...item, 
      details: item.details.filter((el) => getBotByName(el.name).show === true)
    }))

  const clickBot = (name: string) => {    
    const arr: any = []

    for (let i = 0; i < bots.length; i++) {
      const element = bots[i];
      
      if (element.name === name) arr.push({ ...element, show: !element.show })
      else arr.push(element)
    }
    
    setBots(_ => arr)
  }

  const getColor = (name: string) => {
    // #FF9800
    const colors: {[key: string]: string} = {
      "Googlebot": "#2196F3", 
      "AhrefsBot": "#4CAF50"
    }
    return colors[name] ? colors[name] : "#9C27B0"
  }

  const max = findMaxCount(days);
  const maxHeight = 100

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
      {days.map(item => {
        let count = 0

        if (item.details.length > 0) {
          for (let i = 0; i < item.details.length; i++) {
            const el = item.details[i];
            count = count + el.count;
          }
        }

        return (
          <div 
            className={styles.item} 
            key={item.date} 
            title={`Date: ${item.date}, Total: ${item.total}, Details: ${item.details.map(el => `${el.name} - ${el.count}`).join(", ")}`}
            style={{
              width: (100 / days.length) + "%",
              height: (maxHeight / max) * item.total + "px",
              minHeight: "2px"
            }} >
            {count !== 0 ? item.details.map(detail => (
                <div
                  key={detail.name}
                  className={styles.item_slice}
                  style={{
                    height: `calc(${maxHeight / max}px * ${detail.count})`, 
                    background: getColor(detail.name)
                  }} />
            )) : <></> }
          </div>
          )})}
    </div>
  )
}

export default StatisticBots