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
    processSelectAll: () => {
      return async(dispatch: ThunkDispatch<IAction, any, any>, getState: () => IState) => {
        try {
          const response = await fetch('http://localhost:3001/bulk-select', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(getState().selectAll)
          })
          const newData = await response.json()
          dispatch(actions.selectAll(newData))
        } catch(err: any) {
          console.log(err.message)
        }
      }
    },
    processRemoveSelected: () => {
      return async(dispath: ThunkDispatch<IAction, any, any>) => {
        try {
          const response = await fetch('http://localhost:3001/bulk-remove', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const newData = await response.json()
          dispath(actions.setData(newData))
        } catch(err: any) {
          console.log(err.message)
        }
      }
    },
    setData: (data: Array<IListItem>) => ({type: 'SET_DATA', payload: data}),
    setFilter: (value: string) => ({type: 'SET_FILTER', payload: value}),
    selectAll: (data: Array<IListItem>) => ({type: 'SELECT_ALL', payload: data})
}

export default actions