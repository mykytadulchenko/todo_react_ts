import type { IAction, IUserState } from "../../types"
import { LOG_OUT, SET_USER } from "../actions/userActions"

const userState: IUserState = {
    isAuth: false,
    currentUser: null,
    token: null
}

const userReducer = (state: IUserState = userState, action: IAction) => { 
    switch(action.type) {
        case SET_USER:
            if(!action.payload) return state
            localStorage.setItem('auth_token', action.payload)
            const decodedData = JSON.parse(atob(action.payload.split('.')[1]))
            const currentUser = {
                id: decodedData.id,
                login: decodedData.login,
                token: action.payload
            }
            return {...state, currentUser, isAuth: true}
        case LOG_OUT: 
            localStorage.removeItem('auth_token')
            return {...state, currentUser: null, isAuth: false}
        default: return state
    }
}

export default userReducer