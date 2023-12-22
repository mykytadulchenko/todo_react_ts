import axios from 'axios';
import type { ThunkDispatch } from "redux-thunk";
import type { IAction, IListItem, IState } from "../../interfaces";
import axiosResolver from './api/axiosResolver';

export const SET_DATA = 'SET_DATA'
export const SET_FILTER = 'SET_FILTER'
export const SELECT_ALL = 'SELECT_ALL'
const PATH = '/api/todos'

const asyncItemActions = {
    fetchData: (id: string) => {
      return async (dispatch: ThunkDispatch<IState, string, IAction>) => {
        try {
          const response = await axiosResolver.get(`${PATH}/${id}`)
          dispatch(itemActions.setData(response.data))
        } catch (err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    },
    addNewItem: (userId: string, value: string) => {
      return async (dispatch: ThunkDispatch<IState, string, IAction>) => {
        try {
          const response = await axiosResolver.post(PATH, { userId, value })
          dispatch(itemActions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        } 
      }
    },
    editItem: (listItem: IListItem) => {
      return async (dispatch: ThunkDispatch<IState, IListItem, IAction>) => {
        try {
          const response = await axiosResolver.patch(`${PATH}/${listItem.id}`, listItem)
          dispatch(itemActions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        } 
      }
    },
    removeItem: (listItem: IListItem) => {
      return async(dispatch: ThunkDispatch<IState, IListItem, IAction>) => {
        try {
          const response = await axiosResolver.delete(`${PATH}/${listItem.id}`, { data: listItem })
          dispatch(itemActions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    }, 
    processSelectAll: (userId: string) => {
      return async(dispatch: ThunkDispatch<IState, IListItem, IAction>, getState: () => IState) => {
        try {
          const response = await axiosResolver.put(`${PATH}/bulk-select`, { selectAll: getState().items.selectAll, userId })
          dispatch(itemActions.selectAll(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    },
    processRemoveSelected: (userId: string) => {
      return async(dispatch: ThunkDispatch<IState, IListItem, IAction>) => {
        try {
          const response = await axiosResolver.put(`${PATH}/bulk-remove`, { userId })
          dispatch(itemActions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    }
}

export const itemActions = {
  setData: (data: Array<IListItem>) => ({type: SET_DATA, payload: data}),
  setFilter: (value: string) => ({type: SET_FILTER, payload: value}),
  selectAll: (data: Array<IListItem>) => ({type: SELECT_ALL, payload: data})
}


export default asyncItemActions