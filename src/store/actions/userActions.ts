import axios, { AxiosResponse } from "axios"
import { put, takeEvery } from "redux-saga/effects"
import type { IAction, IUser } from "../../interfaces"
import axiosResolver from "./api/axiosResolver"

const ASYNC_SIGNUP_USER = 'ASYNC_SIGNUP_USER'
const ASYNC_SIGNIN_USER = 'ASYNC_SIGNIN_USER'
export const SET_USER = 'SET_USER'
export const LOG_OUT = 'LOG_OUT'
const PATH = '/api/users'

const usersWorkers = {
  signUp: function* (action: IAction): Generator<any, any, AxiosResponse> {
    try {
      const response = yield axiosResolver.post(`${PATH}/sign-up`, action.payload)
      yield put(userActions.setCurrentUser(response.data))
    } catch(err: any) {
      if(axios.isAxiosError(err)) {
        console.log(err.message)
      }
    }
  },
  signIn: function* (action: IAction): Generator<any, any, AxiosResponse> {
    try {
      const response = yield axiosResolver.post(`${PATH}/sign-up`, action.payload)
      yield put(userActions.setCurrentUser(response.data))
    } catch(err: any) {
      if(axios.isAxiosError(err)) {
        console.log(err.message)
      }
    }
  }
}

export const asyncUserActions = {
  signUp: (user: IUser) => ({type: ASYNC_SIGNUP_USER, payload: user}),
  signIn: (user: IUser) => ({type: ASYNC_SIGNIN_USER, payload: user})
}

export const userActions = {
    setCurrentUser: (user: IUser) => ({type: SET_USER, payload: user}),
    logOut: () => ({type: LOG_OUT})
}

export function* usersWatcher() {
  yield takeEvery(ASYNC_SIGNUP_USER, usersWorkers.signUp)
  yield takeEvery(ASYNC_SIGNIN_USER, usersWorkers.signIn)
}

export default asyncUserActions