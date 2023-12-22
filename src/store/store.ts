import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import type { IAction, IState } from "../interfaces"
import itemReducer from "./reducers/itemReducer"
import userReducer from "./reducers/userReducer"

const rootReducer = combineReducers({user: userReducer, items: itemReducer})

const store = createStore<IState, IAction>(rootReducer, applyMiddleware(thunk))
console.log(store.getState())

export default store

//type orm
//create date, update date
//localstorage