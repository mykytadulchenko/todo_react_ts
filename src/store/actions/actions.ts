import axios from 'axios';
import type { ThunkDispatch } from "redux-thunk";
import type { IAction, IListItem, IState } from "../../interfaces";

const actions = {
    fetchData: () => {
      return async (dispatch: ThunkDispatch<IState, any, any>) => {
        try {
          const response = await axios.get('http://localhost:3001')
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
          const response = await axios.post('http://localhost:3001', value, {
                  headers: { 'Content-Type': 'application/json' }
              })
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
          const response = await axios.patch('http://localhost:3001', listItem, {
                  headers: { 'Content-Type': 'application/json' }
              })
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
          const response = await axios.delete('http://localhost:3001/', {
            headers: { 'Content-Type': 'application/json' },
            data: listItem
          })
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
          const response = await axios.put('http://localhost:3001/bulk-select', getState().selectAll, {
            headers: { 'Content-Type': 'application/json' },
          })
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
          const response = await axios.put('http://localhost:3001/bulk-remove', null, {
            headers: { 'Content-Type': 'application/json' }
          })
          dispath(actions.setData(response.data))
        } catch(err: any) {
          if(axios.isAxiosError(err)) {
            console.log(err.message)
          }
        }
      }
    },
    setData: (data: Array<IListItem>) => ({type: 'SET_DATA', payload: data}),
    setFilter: (value: string) => ({type: 'SET_FILTER', payload: value}),
    selectAll: (data: Array<IListItem>) => ({type: 'SELECT_ALL', payload: data})
}

export default actions