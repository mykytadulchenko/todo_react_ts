import { jwtDecode, type JwtPayload } from "jwt-decode"
import type { IAction, IUserState } from "../../types"
import { actionTypes } from "../actions/actionTypes"

const userState: IUserState = {
    isAuth: false,
    currentUser: null,
    socket: null
}

const userReducer = (state: IUserState = userState, action: IAction) => { 
    switch(action.type) {
        case actionTypes.SET_USER:
            if(!action.payload) return state
            localStorage.setItem('auth_token', action.payload)
            const decodedData = jwtDecode<JwtPayload>(action.payload)
            const currentUser = {
                id: decodedData.id,
                login: decodedData.login
            }
            const socket = new WebSocket('ws://localhost:5000')
            return {...state, currentUser, isAuth: true, socket}
        case actionTypes.LOG_OUT: 
            localStorage.removeItem('auth_token')
            return {...state, currentUser: null, isAuth: false}
        default: return state
    }
}

export default userReducer