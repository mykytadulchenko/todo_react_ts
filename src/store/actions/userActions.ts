import axios from "axios"
import type { IAction, IState, IUser } from "../../interfaces"
import type { ThunkDispatch } from "redux-thunk"
import axiosResolver from "./api/axiosResolver"

export const SET_USER = 'SET_USER'
export const LOG_OUT = 'LOG_OUT'
const PATH = '/api/users'

const asyncUserActions = {
    signUp: (user: IUser) => {
    return async(dispatch: ThunkDispatch<IState, IUser, IAction>) => {
      try {
        const response = await axiosResolver.post(`${PATH}/sign-up`, user)
        dispatch(userActions.setCurrentUser(response.data))
      } catch(err: any) {
        if(axios.isAxiosError(err)) {
          console.log(err.message)
        }
      }
    }
  },
  signIn: (user: IUser) => {
    return async (dispatch: ThunkDispatch<IState, IUser, IAction>) => {
      try {
        const response = await axiosResolver.post(`${PATH}/sign-in`, user)
        if(response.data) dispatch(userActions.setCurrentUser(response.data))
      } catch(err) {
        if(axios.isAxiosError(err)) {
          console.log(err)
        }
      }
    }
  }}

const userActions = {
    setCurrentUser: (user: IUser) => ({type: SET_USER, payload: user}),
    logOut: () => ({type: LOG_OUT})
}

export default asyncUserActions