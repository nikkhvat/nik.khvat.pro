import React, { useEffect, useState } from "react";
import Head from 'next/head'
import styles from "./index.module.css";
import { useRouter } from 'next/navigation';

import Storage from "../../../utils/storage";

const Auth = () => {
  const { push } = useRouter();

  const [email, setEmail] = useState()
  const [password, setpassword] = useState()

  useEffect(() => {
    const token = Storage.get("token")

    if (token) push(`/admin`)
  }, [push])

  const signUp = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/auth/sign-in`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          mail: email,
          password: password
        }),
        redirect: 'follow'
      })

      const json = await response.json()
      Storage.set("token", json.token)
      push("/admin")
    } catch (error: any) {
      alert("wrong mail or password")
    }
  }

  return <div className={styles.container} >
    <Head>
      <title>Log in nik19ta.pro</title>
      <meta name='description' content="Admin nik19ta.pro" />
    </Head>
    <div className={styles.login} >
      <p className={styles.login_title} >Admin</p>
      <p className={styles.login_subtitle} >Log into nik19ta.pro admin</p>

      <input 
        className={styles.login_input} 
        placeholder="email" 
        type="text"
        onChange={(e: any) => setEmail(e.target.value)} />

      <input 
        className={styles.login_input} 
        placeholder="password" 
        type="password"
        onChange={(e: any) => setpassword(e.target.value)} />

      <button onClick={signUp} className={styles.login_button} >Log in</button>
    </div>

  </div>
}

export default Auth;