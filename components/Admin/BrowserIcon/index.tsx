
import React from "react"
import styles from "./index.module.css";

import chrome from '../../../images/admin/chrome.png'
import firefox from '../../../images/admin/firefox.png'
import microsoft from '../../../images/admin/microsoft.png'
import opera from '../../../images/admin/opera.png'
import safari from '../../../images/admin/safari.png'
import yandex from '../../../images/admin/yandex.png'
import defaultIcon from '../../../images/admin/default.png'

import Image, { StaticImageData } from "next/image";

const BrowserIcon: React.FC<{ name: string, count: number }> = ({ name, count }) => {
  const getIcon = (key: string): StaticImageData | null => {
    const browsers: { [key: string]: StaticImageData } = {
      "Chrome": chrome,
      "Firefox": firefox,
      "Microsoft": microsoft,
      "Edge": microsoft,
      "Opera": opera,
      "Safari": safari,
      "YaBrowser": yandex
    }

    return browsers[key] ? browsers[key] : defaultIcon
  }
  return (
    <div>
      <Image
        className={styles.browser}
        width={14}
        height={14}
        src={getIcon(name)!.src} alt="" />

      <span className={styles.platform_line_count} >{name}: {count}</span>
    </div>
  )
}


export default BrowserIcon;