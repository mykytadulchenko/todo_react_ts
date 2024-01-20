import type { IUser } from "../../types"
import store from "../store"

import { actionTypes, asyncActionTypes } from "./actionTypes"

export const asyncUserActions = {
  signUp: (user: IUser) => ({ type: asyncActionTypes.SIGNUP_USER, payload: user }),
  signIn: (user: IUser) => ({ type: asyncActionTypes.SIGNIN_USER, payload: user })
}

export const userActions = {
    setCurrentUser: (token: string) => ({ type: actionTypes.SET_USER, payload: token }),
    logOut: () => {
      const socket = store.getState().user.socket
      console.log(socket)
      socket?.close()
      return ({ type: actionTypes.LOG_OUT })
    }
}