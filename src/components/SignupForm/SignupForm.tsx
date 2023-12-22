import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from 'react-hook-form'
import styles from './SignupForm.module.css'
import { useMemo, type FC } from "react"
import type { ISignupForm } from "../../interfaces/components"
import type { IAction, ISignup } from "../../interfaces"
import { useDispatch } from "react-redux"
import type { ThunkDispatch } from "redux-thunk"
import validationSignUpSchema from "../../yup/schemes/validationSignUp"
import asyncUserActions from "../../store/actions/userActions"

const SignupForm:FC<ISignupForm> = ({switchState, switchForm}) => {
  const dispatch = useDispatch<ThunkDispatch<IAction, any, any>>()
  const rootClass = useMemo(() => switchState ? [styles.signup__form, styles.active] : [styles.signup__form], [switchState])
  const {register, handleSubmit, reset, formState: {errors}} = useForm<ISignup>({
    resolver: yupResolver(validationSignUpSchema)
  })
  const processSignUp: SubmitHandler<ISignup> = (data) => {
      dispatch(asyncUserActions.signUp(data))
      reset()
  }

  return (
    <form action="" className={rootClass.join(' ')} onSubmit={handleSubmit(processSignUp)} noValidate>
        <label>
        <input type="text" className={errors.login ? styles.invalid : ''} placeholder="Login..." {...register('login')}/>
        <p className={styles.error}>{errors.login?.message}</p>
        </label>
        <label>
        <input type="email" className={errors.email ? styles.invalid : ''} placeholder="Email..." {...register('email')}/>
        <p className={styles.error}>{errors.email?.message}</p>
        </label>
        <label>
        <input type="password" className={errors.password ? styles.invalid : ''} placeholder="Password..." {...register('password')}/>
        <p className={styles.error}>{errors.password?.message}</p>
        </label>
        <label>
        <input type="password" className={errors.passwordConfirm ? styles.invalid : ''} placeholder="Confirm password..." {...register('passwordConfirm')}/>
        <p className={styles.error}>{errors.passwordConfirm?.message}</p>
        </label>
        <button type="submit">Sign up</button>
        <p onClick={() => switchForm(false)}>...or sign in.</p>
    </form>
  )
}
export default SignupForm