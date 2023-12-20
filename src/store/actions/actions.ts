import axios from 'axios';
import type { ThunkDispatch } from "redux-thunk";
import type { IAction, IListItem, IState } from "../../interfaces";

export const SET_DATA = 'SET_DATA'
export const SET_FILTER = 'SET_FILTER'
export const SELECT_ALL = 'SELECT_ALL'

const axiosFetch = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
})

const actions = {
    fetchData: () => {
      return async (dispatch: ThunkDispatch<IState, any, any>) => {
        try {
          const response = await axiosFetch.get('/api')
          dispatch(actions.setData(response.data))
        } catch (err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    },
    addNewItem: (value: string) => {
      return async (dispatch: ThunkDispatch<IState, any, any>) => {
        try {
          const response = await axiosFetch.post('/api', { value })
          dispatch(actions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        } 
      }
    },
    editItem: (listItem: IListItem) => {
      return async (dispatch: ThunkDispatch<IState, any, any>) => {
        try {
          const response = await axiosFetch.patch(`/api/${listItem.id}`, listItem)
          dispatch(actions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        } 
      }
    },
    removeItem: (listItem: IListItem) => {
      return async(dispatch: ThunkDispatch<IAction, any, any>) => {
        try {
          const response = await axiosFetch.delete(`/api/${listItem.id}`, { data: listItem })
          dispatch(actions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    }, 
    processSelectAll: () => {
      return async(dispatch: ThunkDispatch<IAction, any, any>, getState: () => IState) => {
        try {
          const response = await axiosFetch.put('/api/bulk-select', { selectAll: getState().selectAll })
          dispatch(actions.selectAll(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    },
    processRemoveSelected: () => {
      return async(dispath: ThunkDispatch<IAction, any, any>) => {
        try {
          const response = await axiosFetch.put('/api/bulk-remove')
          dispath(actions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    },
    setData: (data: Array<IListItem>) => ({type: SET_DATA, payload: data}),
    setFilter: (value: string) => ({type: SET_FILTER, payload: value}),
    selectAll: (data: Array<IListItem>) => ({type: SELECT_ALL, payload: data})
}

export default actions