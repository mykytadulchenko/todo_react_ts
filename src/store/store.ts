import { applyMiddleware, createStore } from "redux"
import type { IAction, IListItem, IState } from "../interfaces"
import { thunk } from "redux-thunk"

export const initialState: IState = {
    data: [],
    filter: null,
    selectAll: true
}

const reducer = (state: IState = initialState, action: IAction) => {
    switch(action.type) {
        case 'SET_DATA':
            return {...state, data: action.payload}
        case 'SET_FILTER':
            return {...state, filter: action.payload}
        // case 'SELECT_ALL':
        //     const selectedAllData = state.data.map(el => ({...el, isFinished: state.selectAll}))
        //     return {...state, selectAll: !state.selectAll, data: selectedAllData}
        // case 'REMOVE_SELECTED':
        //     const selectedRemovedData = state.data.filter(el => !el.isFinished)
        //     return {...state, data: selectedRemovedData}
        default: return state
    }
}

const store = createStore(reducer, initialState, applyMiddleware(thunk))

export default store