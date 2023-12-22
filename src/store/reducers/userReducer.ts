import type { IAction, IState, IUserState } from "../../interfaces"
import { SET_USER } from "../actions/userActions"

const userState: IUserState = {
    isAuth: false,
    currentUser: null
}

const userReducer = (state: IUserState = userState, action: IAction) => { 
    switch(action.type) {
        case SET_USER:
            //localStorage.setItem('currentUser', {user: })
            return {...state, currentUser: action.payload, isAuth: true}
        default: return state
    }
}

export default userReducer