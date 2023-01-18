import React from "react";

import styles from './index.module.css'

interface iServiceItem {
  size: "small" | "large" | "normal"
  name: string
  sub: string | null
}

interface IService {
  services: iServiceItem[]
}

const Service: React.FC<IService> = ({services}) => {

  const classItem = (size: "small" | "large" | "normal") => {
    switch (size) {
      case 'small':
        return `${styles.service_screen__item} ${styles.service_screen__small_item}`
      case 'normal':
        return `${styles.service_screen__item} ${styles.service_screen__normal_item}`
      case 'large':
        return `${styles.service_screen__item} ${styles.service_screen__large_item}`
      default:
        return styles.service_screen__item
    }
  }

  return (
    <div id="service" className={styles.service_screen} >

      <div className={styles.service_screen__items} >
        {services.map(item => 
          <div key={item.name} className={classItem(item.size)} >
            <p className={styles.service_screen__item_title} > {item.name} </p>
            {item.sub !== null && <p className={styles.service_screen__item_sub_title} >{item.sub}</p>}
          </div>
        )}
      </div>

      <div className={styles.services_title_container} >
        <div className={styles.services_line} ></div>
        <p className={styles.services_title} >Services</p>
      </div>

    </div>
  )
}

export default Service;