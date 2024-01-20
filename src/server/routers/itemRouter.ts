import { itemQueries } from "../../db/typeorm/queries/itemQueries.js"
import { actionTypes, socketActionTypes } from "../../store/actions/actionTypes.js"
import { type IAction } from "../../types"
import jwtResolver from "../auth/jwtResolver.js"

const dataRequestHandler = async (id: string) => {
    const data = await itemQueries.GET_ITEMS_QUERY(id)
    return data
}

const itemRouter = async (action: IAction, token: string, ) => {
    const payload = jwtResolver.decodePayload(token)
    switch(action.type) {
        case socketActionTypes.getData: {
            const data = await dataRequestHandler(payload.id)
            return JSON.stringify({action: { type: actionTypes.SET_DATA, payload: data }, token})
        }
        case socketActionTypes.addItem: {
            await itemQueries.SET_ITEM_QUERY(action.payload, false, payload.id)
            const data = await dataRequestHandler(payload.id)
            return JSON.stringify({action: { type: actionTypes.SET_DATA, payload: data }, token})
        }
        case socketActionTypes.editItem: {
            const { id, value, completed } = action.payload
            await itemQueries.EDIT_ITEM_QUERY(value, completed, id)
            const data = await dataRequestHandler(payload.id)
            return JSON.stringify({action: { type: actionTypes.SET_DATA, payload: data }, token})
        }
        case socketActionTypes.removeItem: {
            await itemQueries.DELETE_ITEM_QUERY(action.payload.id)
            const data = await dataRequestHandler(payload.id)
            return JSON.stringify({action: { type: actionTypes.SET_DATA, payload: data }, token})
        }
        case socketActionTypes.selectAll: {
            await itemQueries.SELECT_ALL_QUERY(action.payload, payload.id)
            const data = await dataRequestHandler(payload.id)
            return JSON.stringify({action: { type: actionTypes.SET_DATA, payload: data }, token})
        }
        case socketActionTypes.removeSelected: {
            await itemQueries.DELETE_SELECTED(payload.id)
            const data = await dataRequestHandler(payload.id)
            return JSON.stringify({action: { type: actionTypes.SET_DATA, payload: data }, token})
        }
    }   
}

export default itemRouter