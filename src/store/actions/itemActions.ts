import axios, { Axios, AxiosResponse } from 'axios';
import type { ThunkDispatch } from "redux-thunk";
import type { IAction, IListItem, IState } from "../../interfaces";
import axiosResolver from './api/axiosResolver';
import { put, takeEvery } from 'redux-saga/effects';

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
    fetchData: function* (action: IAction):Generator<any, any, AxiosResponse> {
      try {
        const response = yield axiosResolver.get(`${PATH}/${action.payload}`)
        yield put(itemActions.setData(response.data))
      } catch (err: any) {
        if(axios.isAxiosError(err)) {
          console.log(err.message)
        }
      }
    },
    addNewItem: function* (action: IAction):Generator<any, any, AxiosResponse> {
      try {
        const response = yield axiosResolver.post(PATH, { ...action.payload })
        yield put(itemActions.setData(response.data))
      } catch(err: any) {
        if(axios.isAxiosError(err)) {
          console.log(err.message)
        }
      } 
    },
    editItem: function* (action: IAction):Generator<any, any, AxiosResponse> {
      try {
        const response = yield axiosResolver.patch(`${PATH}/${action.payload._id}`, action.payload)
        yield put(itemActions.setData(response.data))
      } catch(err: any) {
        if(axios.isAxiosError(err)) {
          console.log(err.message)
        }
      } 
    },
    removeItem: function* (action: IAction):Generator<any, any, AxiosResponse> {
      try {
        const response = yield axiosResolver.delete(`${PATH}/${action.payload._id}`, { data: action.payload })
        yield put(itemActions.setData(response.data))
      } catch(err: any) {
        if(axios.isAxiosError(err)) {
          console.log(err.message)
        }
      }
    }, 
    processSelectAll: function* (action: IAction):Generator<any, any, AxiosResponse> {
      try {
        const response = yield axiosResolver.put(`${PATH}/bulk-select`, { ...action.payload })
        yield put(itemActions.selectAll(response.data))
      } catch(err: any) {
        if(axios.isAxiosError(err)) {
          console.log(err.message)
        }
      }
    },
    processRemoveSelected: function* (action: IAction):Generator<any, any, AxiosResponse> {
      try {
        const response = yield axiosResolver.put(`${PATH}/bulk-remove`, { ...action.payload })
        yield put(itemActions.setData(response.data))
      } catch(err: any) {
        if(axios.isAxiosError(err)) {
          console.log(err.message)
        }
      }
    }
}

export const asyncItemActions = {
  fetchData: (id: string) => ({type: ASYNC_FETCH_DATA, payload: id}),
  addNewItem: (userId: string, value: string) => ({type: ASYNC_ADD_ITEM, payload: {userId, value}}),
  editItem: (listItem: IListItem) => ({type: ASYNC_EDIT_ITEM, payload: listItem}),
  removeItem: (listItem: IListItem) => ({type: ASYNC_REMOVE_ITEM, payload: listItem}),
  processSelectAll: (userId: string, selectAll: boolean) => ({type: ASYNC_SELECT_ALL, payload: { userId, selectAll }}),
  processRemoveSelected: (userId: string) => ({type: ASYNC_REMOVE_SELECTED, payload: { userId }})
}

export const itemActions = {
  setData: (data: Array<IListItem>) => ({type: SET_DATA, payload: data}),
  setFilter: (value: string) => ({type: SET_FILTER, payload: value}),
  selectAll: (data: Array<IListItem>) => ({type: SELECT_ALL, payload: data})
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