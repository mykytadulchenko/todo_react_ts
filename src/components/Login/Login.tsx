import type { FC } from 'react'
import { useState } from 'react'
import SigninForm from '../SigninForm/SigninForm'
import SignupForm from '../SignupForm/SignupForm'
import styles from './Login.module.css'

const Login:FC = () => {
  const [isFormSwitched, setFormSwitched] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        <h1>Welcome!</h1>
        <p>Authorize to get access to all features!</p>
      </div>
      <div className={styles.form__container}>
          <SigninForm switchState={isFormSwitched} switchForm={setFormSwitched}/>
          <SignupForm switchState={isFormSwitched} switchForm={setFormSwitched}/>
        </div>
    </div>
  )
}

export default Login