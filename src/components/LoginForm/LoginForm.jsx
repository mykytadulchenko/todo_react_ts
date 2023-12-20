import { useRef } from 'react'
import styles from './LoginForm.module.css'

const LoginForm = ({setIsAuth}) => {
  const container = useRef()
  const rootClass = [styles.container]

  const processForm = (e) => {
      e.preventDefault()
      setIsAuth(true)
  }
  
  const replaceLoginForm = () => {
    if(!rootClass[1]) rootClass.push(styles.active)
    else rootClass.pop()
    container.current.className = rootClass.join(' ')
  }

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.form__container}>
          <form action="" className={styles.login__form} onSubmit={processForm}>
              <input type="text" placeholder="Login..."/>
              <input type="password" placeholder="Password..."/>
              <button type="submit">Sign in</button>
              <p onClick={replaceLoginForm}>...or sign up.</p>
          </form>
          <form action="" className={styles.signup__form} onSubmit={processForm}>
              <input type="text" placeholder="Login..."/>
              <input type="email" placeholder="Email..."/>
              <input type="password" placeholder="Password..."/>
              <input type="password" placeholder="Confirm password..."/>
              <button type="submit">Sign up</button>
              <p onClick={replaceLoginForm}>...or sign in.</p>
          </form>
        </div>
    </div>
  )
}

export default LoginForm

/*
login (4 - 16 symbol)
email (mail validation)
pass (8 - 16 symbol)
pass confirm
submit button

or login/register

if(err) render err under input

react hooks forms
yup
*/