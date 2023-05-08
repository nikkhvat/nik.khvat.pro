import { useEffect } from "react"

const Stat = () => {

  useEffect(() => {
    const extendTimeSpent = async (session: string) => {
      const url = `${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/visit/extend?session=${session}`
      await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' } })

      setTimeout(() => extendTimeSpent(session), 3000)
    }

    const isVisited = localStorage.stat_visit
    const token = localStorage.stat_token

    if (token) return

    const requestOptions: any = { method: 'PUT', redirect: 'follow' };

    if (!isVisited) {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/visit?un=1`, requestOptions)
        .then(data => data.json())
        .then(data => extendTimeSpent(data.session))
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/visit?un=0`, requestOptions)
        .then(data => data.json())
        .then(data => extendTimeSpent(data.session))
    }

    localStorage.stat_visit = true
  })

  return <></>
}

export default Stat