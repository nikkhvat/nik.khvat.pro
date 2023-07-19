import { useEffect } from "react"

const Stat = () => {
  useEffect(() => {
    const extendTimeSpent = async (session: string) => {
      localStorage.stat_visit_session = session
      const url = `https://gostat.app/api/stats/set/visit/extend?session=${session}&app_id=b871fdf8-3de0-4b9c-870a-2e534cd0817c`;
      await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' } })

      setTimeout(() => extendTimeSpent(session), 3000)
    }

    const requestOptions: any = { method: 'PUT', redirect: 'follow' };

    // Delay 800 
    setTimeout(() => {
      if (
        !!localStorage.stat_visit_session ||
        localStorage.stat_visit_session === "undefined"
      ) {
        fetch(
          `https://gostat.app/api/stats/set/visit?un=1&url=${
            window.location.pathname
          }&title=${document.querySelector("title")?.innerHTML}&session=${
            localStorage.stat_visit_session
          }&app_id=b871fdf8-3de0-4b9c-870a-2e534cd0817c`,
          requestOptions
        )
          .then((data) => data.json())
          .then((data) => extendTimeSpent(data.session));
      } else {
        fetch(
          `https://gostat.app/api/stats/set/visit/extend?un=0&url=${
            window.location.pathname
          }&title=${
            document.querySelector("title")?.innerHTML
          }&app_id=b871fdf8-3de0-4b9c-870a-2e534cd0817c`,
          requestOptions
        )
          .then((data) => data.json())
          .then((data) => extendTimeSpent(data.session));
      }
    }, 800)

  })

  return <></>
}

export default Stat