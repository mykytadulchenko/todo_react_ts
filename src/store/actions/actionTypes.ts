export const asyncActionTypes = {
    FETCH_DATA: 'FETCH_DATA',
    ADD_ITEM: 'ADD_ITEM',
    EDIT_ITEM: 'EDIT_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    SELECT_ALL: 'SELECT_ALL',
    REMOVE_SELECTED: 'REMOVE_SELECTED',
    SIGNUP_USER: 'SIGNUP_USER',
    SIGNIN_USER: 'SIGNIN_USER'
}

export const actionTypes = {
    SET_DATA: 'SET_DATA',
    SET_FILTER: 'SET_FILTER',
    SELECT_ALL: 'SELECT_ALL',
    SET_USER: 'SET_USER',
    LOG_OUT: 'LOG_OUT'
}

export const socketActionTypes = {
    getData: 'socket/getData',
    addItem: 'socket/addItem',
    editItem: 'socket/editItem',
    removeItem: 'socket/removeItem',
    selectAll: 'socket/selectAll',
    removeSelected: 'socket/removeSelected'
}

export const errorActionTypes = {
    authError: 'AUTH_ERR'
}