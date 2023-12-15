import type { ThunkDispatch } from "redux-thunk";
import type { IAction, IListItem, IState } from "../../interfaces"

const actions = {
    fetchData: () => {
      return async (dispatch: ThunkDispatch<IState, any, any>) => {
        try {
          const response = await fetch('http://localhost:3001', {
            method: 'GET',
          });
          const data = await response.json();
          dispatch(actions.setData(data));
        } catch (error: any) {
          console.log(error.message);
        }
      }
    },
    addNewItem: (value: string) => {
      return async (dispatch: ThunkDispatch<IState, any, any>) => {
        try {
          const response = await fetch('http://localhost:3001', {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(value)
              })
          const newData = await response.json()
          dispatch(actions.setData(newData))
        } catch(err: any) {
          console.log(err.message)
        } 
      }
    },
    editItem: (listItem: IListItem) => {
      return async (dispatch: ThunkDispatch<IState, any, any>) => {
        try {
          const response = await fetch('http://localhost:3001', {
                  method: 'PATCH',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(listItem)
              })
          const newData = await response.json()
          dispatch(actions.setData(newData))
        } catch(err: any) {
          console.log(err.message)
        } 
      }
    },
    removeItem: (listItem: IListItem) => {
      return async(dispatch: ThunkDispatch<IAction, any, any>) => {
        try {
          const response = await fetch('http://localhost:3001/', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(listItem)
          })
          const newData = await response.json()
          dispatch(actions.setData(newData))
        } catch(err: any) {
          console.log(err.message)
        }
      }
    }, 
    setData: (data: Array<IListItem>) => ({type: 'SET_DATA', payload: data}),
    setFilter: (value: string) => ({type: 'SET_FILTER', payload: value}),
    selectAll: () => ({type: 'SELECT_ALL'}),
    removeSelected: () => ({type: 'REMOVE_SELECTED'}),
}

export default actions