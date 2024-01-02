import { Container, styled } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../store/actions/userActions"
import { getAuthStatus } from "../../store/selectors"
import LoginForm from "../Login/Login"
import TodoList from "../TodoList/TodoList"

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
    fontFamily: "'Montserrat', sans-serif",
    '& > h1': {
      fontSize: '3em',
      color: '#fafafa',
      textTransform: 'uppercase',
      textShadow: '2px 5px 5px rgba(84, 84, 84, 0.4)'
    }
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
        <h1>Todo List</h1>
        <TodoList />
      </>
      :
      <LoginForm/>}
    </AppContainer>
  )
}

export default App