import React from "react"
import styles from "./index.module.css"

interface ProgressBarProps {
  fs: number
  sc: number
  style: any
}


const ProgressBar: React.FC<ProgressBarProps> = ({ fs, sc, style }) => {
  return <div className={styles.card_progress} style={style} >
    <div className={styles.card_progress__nums} >
      <span className={styles.card_progress__num} ></span>
      <span className={styles.card_progress__num} ></span>
    </div>

    <div style={{ width: "100%", height: "5px" }} className={styles.card_progress__line} >
      <div style={{ width: 100 / fs * sc + "%", height: "5px" }} className={styles.card_progress__line_fill} ></div>
    </div>
  </div>
}

export default ProgressBar;