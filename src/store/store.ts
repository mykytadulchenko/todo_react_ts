import { StoreEnhancer, applyMiddleware, combineReducers, legacy_createStore } from "redux"
import type { SagaMiddleware } from "redux-saga"
import createSagaMiddleware from "redux-saga"
import type { IAction, IState } from "../types"

import { rootWatcher } from "./actions/sagas/userSagas"
import itemReducer from "./reducers/itemReducer"
import userReducer from "./reducers/userReducer"

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({user: userReducer, items: itemReducer})
const store = legacy_createStore<IState, IAction, StoreEnhancer, SagaMiddleware>(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)

export default store