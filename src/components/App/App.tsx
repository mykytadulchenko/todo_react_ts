import { useState } from "react"
import TodoList from "../TodoList/TodoList"
import styles from "./App.module.css"
import LoginForm from "../Login/Login"
import { useSelector } from "react-redux"
import { getAuthStatus } from "../../store/selectors"

function App() {
  const isAuth = useSelector(getAuthStatus)
  return (
    <div className={styles.app}>
      {isAuth ?
      <>
        <h1 className={styles.title}>Todo List</h1>
        <TodoList />
      </>
      :
      <LoginForm/>}
    </div>
  )
}

export default App