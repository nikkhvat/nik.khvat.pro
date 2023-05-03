import Link from 'next/link'

import styles from '../styles/404.module.css'

export default function FourOhFour() {
    return <div className={styles.container} >
        <h1 className={styles.title} >404</h1>
        <hr className={styles.line} />
        <Link className={styles.link} href="/" >This page could not be found.</Link>
    </div>
}
