import type { IAction, IState, IUserState } from "../../interfaces"
import { LOG_OUT, SET_USER } from "../actions/userActions"

const userState: IUserState = {
    isAuth: false,
    currentUser: null
}

const userReducer = (state: IUserState = userState, action: IAction) => { 
    switch(action.type) {
        case SET_USER:
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            return {...state, currentUser: action.payload, isAuth: true}
        case LOG_OUT: 
            localStorage.removeItem('currentUser')
            return {...state, currentUser: null, isAuth: false}
        default: return state
    }
}

export default userReducer