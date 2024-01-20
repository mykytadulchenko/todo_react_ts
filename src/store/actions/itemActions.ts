import type { IAction, IListItem } from "../../types";
import store from '../store';
import { actionTypes, errorActionTypes, socketActionTypes } from "./actionTypes";
import { userActions } from "./userActions";

const actionHandler = async (action: IAction, actionFunction?: any) => {
  const socket = store.getState().user.socket!
  if(socket.readyState !== 1) {
    await new Promise(resolve => {
        socket.onopen = () => {
            resolve(1)
        }
    })
  }
  socket.send(JSON.stringify({ action, token: localStorage.getItem('auth_token')}))
  socket.onmessage = (e: any) => {
    const response = JSON.parse(e.data)
    if(response.action.type === errorActionTypes.authError) {
      store.dispatch(userActions.logOut())
      socket.close()
      return
    }
    if(actionFunction) {
        store.dispatch(actionFunction(response.action.payload))
    } else {
        store.dispatch(response.action)
    }
  }
}


export const asyncItemActions = {
  getData: () => {
    actionHandler({ type: socketActionTypes.getData })
  },
  addItem: (value: string) => {
    actionHandler({ type: socketActionTypes.addItem, payload: value })
  },
  editItem: (listItem: IListItem) => {
    actionHandler({ type: socketActionTypes.editItem, payload: listItem })
  },
  removeItem: (listitem: IListItem) => {
    actionHandler({ type: socketActionTypes.removeItem, payload: listitem })
  },
  selectAll: (selectAll: boolean) => {
    actionHandler({ type: socketActionTypes.selectAll, payload: selectAll }, itemActions.selectAll)
  },
  removeSelected: () => {
    actionHandler({ type: socketActionTypes.removeSelected })
  }
}

export const itemActions = {
  setFilter: (value: string) => ({ type: actionTypes.SET_FILTER, payload: value }),
  selectAll: (data: Array<IListItem>) => ({ type: actionTypes.SELECT_ALL, payload: data })
}
