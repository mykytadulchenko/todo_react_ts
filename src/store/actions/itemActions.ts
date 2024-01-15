import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import type { IAction, IListItem, IUser } from "../../types";
import axiosResolver from './api/axiosResolver';
import { userActions } from './userActions';

const ASYNC_FETCH_DATA = 'ASYNC_FETCH_DATA'
const ASYNC_ADD_ITEM = 'ASYNC_ADD_ITEM'
const ASYNC_EDIT_ITEM = 'ASYNC_EDIT_ITEM'
const ASYNC_REMOVE_ITEM = 'ASYNC_REMOVE_ITEM'
const ASYNC_SELECT_ALL = 'ASYNC_SELECT_ALL'
const ASYNC_REMOVE_SELECTED = 'ASYNC_REMOVE_SELECTED'
export const SET_DATA = 'SET_DATA'
export const SET_FILTER = 'SET_FILTER'
export const SELECT_ALL = 'SELECT_ALL'
const PATH = '/api/todos'

const itemsWorkers = {
    fetchData: function* (action: IAction):Generator<any, void, AxiosResponse> {
      try {
        const { id, token } = action.payload
        const response = yield axiosResolver.get(`${ PATH }/${ id }`, {
          headers: { 'Authorization': `Bearer ${ token }` }
        })
        yield put(itemActions.setData(response.data.data))
        if(response.data.token) {
          yield put(userActions.setCurrentUser(response.data.token))
        }
      } catch (err: any) {
        console.log(err)
        if(axios.isAxiosError(err) && err.response?.status === 403) {
          yield put(userActions.logOut())
        } 
      }
    },
    addNewItem: function* (action: IAction):Generator<any, void, AxiosResponse> {
      try {
        const { userId, value, token } = action.payload
        const response = yield axiosResolver.post(PATH, { userId, value }, {
          headers: { 'Authorization': `Bearer ${ token }` }
        })
        yield put(itemActions.setData(response.data.data))
        if(response.data.token) {
          yield put(userActions.setCurrentUser(response.data.token))
        }
      } catch (err: any) {
        console.log(err)
        if(axios.isAxiosError(err) && err.response?.status === 403) {
          yield put(userActions.logOut())
        } 
      }
    },
    editItem: function* (action: IAction):Generator<any, void, AxiosResponse> {
      try {
        const { listItem, token } = action.payload
        const response = yield axiosResolver.patch(`${ PATH }/${ listItem.id }`, listItem , {
          headers: { 'Authorization': `Bearer ${ token }` }
        })
        yield put(itemActions.setData(response.data.data))
        if(response.data.token) {
          yield put(userActions.setCurrentUser(response.data.token))
        }
      } catch (err: any) {
        console.log(err)
        if(axios.isAxiosError(err) && err.response?.status === 403) {
          yield put(userActions.logOut())
        } 
      }
    },
    removeItem: function* (action: IAction):Generator<any, void, AxiosResponse> {
      try {
        const { listItem, token } = action.payload
        const response = yield axiosResolver.delete(`${ PATH }/${ listItem.id }`, { 
          headers: { 'Authorization': `Bearer ${ token }` }
        })
        yield put(itemActions.setData(response.data.data))
        if(response.data.token) {
          yield put(userActions.setCurrentUser(response.data.token))
        }
      } catch (err: any) {
        console.log(err)
        if(axios.isAxiosError(err) && err.response?.status === 403) {
          yield put(userActions.logOut())
        } 
      }
    }, 
    processSelectAll: function* (action: IAction):Generator<any, void, AxiosResponse> {
      try {
        const { userId, selectAll, token } = action.payload
        const response = yield axiosResolver.put(`${ PATH }/bulk-select`, { userId, selectAll }, { 
          headers: { 'Authorization': `Bearer ${ token }` },
        })
        yield put(itemActions.selectAll(response.data.data))
        if(response.data.token) {
          yield put(userActions.setCurrentUser(response.data.token))
        }
      } catch (err: any) {
        console.log(err)
        if(axios.isAxiosError(err) && err.response?.status === 403) {
          yield put(userActions.logOut())
        } 
      }
    },
    processRemoveSelected: function* (action: IAction):Generator<any, void, AxiosResponse> {
      try {
        const { userId, token } = action.payload
        const response = yield axiosResolver.put(`${ PATH }/bulk-remove`, { userId }, { 
          headers: { 'Authorization': `Bearer ${ token }` },
        })
        yield put(itemActions.setData(response.data.data))
        if(response.data.token) {
          yield put(userActions.setCurrentUser(response.data.token))
        }
      } catch (err: any) {
        console.log(err)
        if(axios.isAxiosError(err) && err.response?.status === 403) {
          yield put(userActions.logOut())
        } 
      }
    }
}

export const asyncItemActions = {
  fetchData: (user: IUser) => ({ type: ASYNC_FETCH_DATA, payload: user }),
  addNewItem: (user: IUser, value: string) => ({type: ASYNC_ADD_ITEM, payload: { userId: user.id, value, token: user.token } }),
  editItem: (listItem: IListItem, token: string) => ({ type: ASYNC_EDIT_ITEM, payload: { listItem, token } }),
  removeItem: (listItem: IListItem, token: string) => ({ type: ASYNC_REMOVE_ITEM, payload: { listItem, token} }),
  processSelectAll: (user: IUser, selectAll: boolean) => ({ type: ASYNC_SELECT_ALL, payload: { userId: user.id, selectAll, token: user.token } }),
  processRemoveSelected: (user: IUser) => ({ type: ASYNC_REMOVE_SELECTED, payload: { userId: user.id, token: user.token } })
}

export const itemActions = {
  setData: (data: Array<IListItem>) => ({ type: SET_DATA, payload: data }),
  setFilter: (value: string) => ({ type: SET_FILTER, payload: value }),
  selectAll: (data: Array<IListItem>) => ({ type: SELECT_ALL, payload: data })
}

export function* itemsWatcher() {
  yield takeEvery(ASYNC_FETCH_DATA, itemsWorkers.fetchData)
  yield takeEvery(ASYNC_ADD_ITEM, itemsWorkers.addNewItem)
  yield takeEvery(ASYNC_EDIT_ITEM, itemsWorkers.editItem)
  yield takeEvery(ASYNC_REMOVE_ITEM, itemsWorkers.removeItem)
  yield takeEvery(ASYNC_SELECT_ALL, itemsWorkers.processSelectAll)
  yield takeEvery(ASYNC_REMOVE_SELECTED, itemsWorkers.processRemoveSelected)
}

export default asyncItemActions