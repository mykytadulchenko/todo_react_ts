import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../store/actions/userActions"
import { getAuthStatus } from "../../store/selectors"
import LoginForm from "../Login/Login"
import TodoList from "../TodoList/TodoList"
import styles from "./App.module.css"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if(user) {
      dispatch(userActions.setCurrentUser(JSON.parse(user)))
    }
  }, [])
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