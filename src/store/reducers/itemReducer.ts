import type { IAction, IItemState } from "../../types"
import { actionTypes } from "../actions/actionTypes"

const itemState: IItemState = {
    data: [],
    filter: 'All',
    selectAll: true
}

const itemReducer = (state: IItemState = itemState, action: IAction) => {
    switch(action.type) {
        case actionTypes.SET_DATA:
            return {...state, data: action.payload}
        case actionTypes.SET_FILTER:
            return {...state, filter: action.payload}
        case actionTypes.SELECT_ALL:
            return {...state, data: action.payload, selectAll: !state.selectAll}
        default: return state
    }
}

export default itemReducer