import { applyMiddleware, createStore } from "redux"
import { thunk } from "redux-thunk"
import type { IAction, IState } from "../interfaces"
import { SELECT_ALL, SET_DATA, SET_FILTER } from "./actions/actions"

const initialState: IState = {
    data: [],
    filter: 'All',
    selectAll: true
}

const reducer = (state: IState = initialState, action: IAction) => {
    switch(action.type) {
        case SET_DATA:
            return {...state, data: action.payload}
        case SET_FILTER:
            return {...state, filter: action.payload}
        case SELECT_ALL:
            return {...state, data: action.payload, selectAll: !state.selectAll}
        default: return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store