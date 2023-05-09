import { useEffect } from "react"

const Stat = () => {
  useEffect(() => {
    const extendTimeSpent = async (session: string) => {
      localStorage.stat_visit_session = session
      const url = `${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/visit/extend?session=${session}`
      await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' } })

      setTimeout(() => extendTimeSpent(session), 3000)
    }

    const token = localStorage.stat_token

    if (token) return

    const requestOptions: any = { method: 'PUT', redirect: 'follow' };

    // Delay 800 
    setTimeout(() => {
      if (localStorage.stat_visit_session) {
        fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/visit?un=1&url=${window.location.pathname}&title=${document.querySelector("title")?.innerHTML}&session=${localStorage.stat_visit_session}`, requestOptions)
          .then(data => data.json())
          .then(data => extendTimeSpent(data.session))
      } else {
        fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/stat/update/visit?un=0&url=${window.location.pathname}&title=${document.querySelector("title")?.innerHTML}`, requestOptions)
          .then(data => data.json())
          .then(data => extendTimeSpent(data.session))
      }
    }, 800)

  })

  return <></>
}

export default Stat