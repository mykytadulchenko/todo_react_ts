import { useState } from "react"
import TodoList from "../TodoList/TodoList"
import styles from "./App.module.css"
import LoginForm from "../LoginForm/LoginForm"

function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <div className={styles.app}>
      {isAuth ?
      <>
        <h1 className={styles.title}>Todo List</h1>
        <TodoList />
      </>
      :
      <LoginForm setIsAuth={setIsAuth}/>}
    </div>
  )
}

export default App