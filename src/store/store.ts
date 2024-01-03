import { StoreEnhancer, applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { ThunkMiddleware, thunk } from "redux-thunk"
import type { IAction, IState } from "../interfaces"
import itemReducer from "./reducers/itemReducer"
import userReducer from "./reducers/userReducer"

const rootReducer = combineReducers({user: userReducer, items: itemReducer})

const store = legacy_createStore<IState, IAction, StoreEnhancer, ThunkMiddleware>(rootReducer, applyMiddleware(thunk))

export default store