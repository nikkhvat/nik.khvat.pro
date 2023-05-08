import React from "react"
import styles from "./index.module.css"

interface ProgressBarProps {
  fs: number
  sc: number
  style: any
}


const ProgressBar: React.FC<ProgressBarProps> = ({ fs, sc, style }) => {
  return <div className={styles.card_progress} style={style} >
    <div className={styles.card_progress__line} >
      <div style={{ width: 100 / fs * sc + "%" }} className={styles.card_progress__line_fill} ></div>
    </div>
  </div>
}

export default ProgressBar;