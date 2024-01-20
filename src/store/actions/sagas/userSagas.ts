import { AxiosResponse } from "axios"
import { IAction } from "../../../types"
import axiosUsersResolvers from "../api/axiosResolvers/userResolvers"
import { all, put, takeEvery } from "redux-saga/effects"
import { userActions } from "../userActions"
import { asyncActionTypes } from "../actionTypes"

const PATH = '/api/users'

export const usersWorkers = {
  signUp: function* (action: IAction): Generator<any, void, AxiosResponse<string>> {
    const response = yield axiosUsersResolvers.post(`${ PATH }/sign-up`, action.payload)
    yield put(userActions.setCurrentUser(response.data))   
  },
  signIn: function* (action: IAction): Generator<any, void, AxiosResponse<string>> {
    const response = yield axiosUsersResolvers.post(`${ PATH }/sign-in`, action.payload)
    yield put(userActions.setCurrentUser(response.data))
  }
}

export function* usersWatcher() {
  yield takeEvery(asyncActionTypes.SIGNUP_USER, usersWorkers.signUp)
  yield takeEvery(asyncActionTypes.SIGNIN_USER, usersWorkers.signIn)
}

export function* rootWatcher() {
  yield all([usersWatcher()])
}