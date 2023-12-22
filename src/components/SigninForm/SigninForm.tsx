import { useMemo, type FC } from "react"
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import type { ThunkDispatch } from "redux-thunk"
import { IAction, ISignin } from "../../interfaces"
import type { ISigninForm } from "../../interfaces/components"
import styles from './SigninForm.module.css'
import asyncUserActions from "../../store/actions/userActions"

const SigninForm:FC<ISigninForm> = ({switchState, switchForm}) => {
  const dispatch = useDispatch<ThunkDispatch<IAction, any, any>>()
  const {handleSubmit, register, reset} = useForm<ISignin>()
  const rootClass = useMemo(() => switchState ? [styles.login__form, styles.active] : [styles.login__form], [switchState])
  const processSignIn:SubmitHandler<ISignin> = (data) => {
    dispatch(asyncUserActions.signIn(data))
    reset()
  }
  return (
    <form action="" className={rootClass.join(' ')} onSubmit={handleSubmit(processSignIn)}>
        <input type="text" placeholder="Login..." {...register('login')}/>
        <input type="password" placeholder="Password..." {...register('password')}/>
        <button type="submit">Sign in</button>
        <p onClick={() => switchForm(true)}>...or sign up.</p>
    </form>
  )
}
export default SigninForm