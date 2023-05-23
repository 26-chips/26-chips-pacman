import { useEffect } from 'react'
import './App.css'
import styles from './styles.module.scss'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className={styles.app}>Вот тут будет жить ваше приложение :)</div>
}

export default App