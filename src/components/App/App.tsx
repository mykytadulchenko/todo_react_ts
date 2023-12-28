import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../store/actions/userActions"
import { getAuthStatus } from "../../store/selectors"
import LoginForm from "../Login/Login"
import TodoList from "../TodoList/TodoList"
import styles from "./App.module.css"
import { Container, styled } from "@mui/material"

const AppContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    padding: '20px',
    height: '100vh',
    maxWidth: '100%',
    background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
    fontFamily: "'Montserrat', sans-serif"
  }
  
})

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
    <AppContainer>
      {isAuth ?
      <>
        <h1 className={styles.title}>Todo List</h1>
        <TodoList />
      </>
      :
      <LoginForm/>}
    </AppContainer>
  )
}

export default App