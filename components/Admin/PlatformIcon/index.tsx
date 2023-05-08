import React from "react"
import styles from "./index.module.css";

import ipad from '../../../images/admin/platforms/ipad.png'
import iphone from '../../../images/admin/platforms/iphone.png'
import notebook from '../../../images/admin/platforms/notebook.png'
import windows from '../../../images/admin/platforms/windows.png'
import windows7 from '../../../images/admin/platforms/windows7.png'
import apple from '../../../images/admin/platforms/apple.png'
import linux from '../../../images/admin/platforms/linux.png'
import android from '../../../images/admin/platforms/android.png'
import bot from '../../../images/admin/platforms/bot.png'

import Image, { StaticImageData } from "next/image";

const PlatformIcon: React.FC<{ name: string, count: number }> = ({ name, count }) => {

  const getShortName = (name: string) => {
    if (name.indexOf("iPhone") !== -1) return "iPhone"
    if (name.indexOf("Windows 10") !== -1) return "Win 10"
    if (name.indexOf("Windows 7") !== -1) return "Win 7"
    if (name.indexOf("Linux") !== -1) return "Linux"
    if (name.indexOf("Mac OS") !== -1) return "Mac OS"
    if (name.indexOf("Android") !== -1) return "Android"

    return name
  }

  const getPlatformIcon = (key: string): StaticImageData => {

    if (key.indexOf("Mac") !== -1) return apple
    if (key.indexOf("Linux") !== -1) return linux
    if (key.indexOf("Android") !== -1) return android

    const platforms: { [key: string]: StaticImageData } = {
      "Android": android,
      "Linux": android,
      "iPad": ipad,
      "iPhone": iphone,
      "Macintosh": apple,
      "Windows": windows,
      "Windows 10": windows,
      "Windows 7": windows7,
      "Googlebot": bot,
      "AhrefsBot": bot,
      "Vercelbot": bot
    }

    return platforms[key] ? platforms[key] : notebook
  }

  return (
    <div>
      <Image
        className={styles.browser}
        width={14}
        height={14}
        src={getPlatformIcon(name).src} alt="" />

      <span className={styles.platform_line_count} >{getShortName(name)}: ({count})</span>
    </div>
  )
}


export default PlatformIcon;