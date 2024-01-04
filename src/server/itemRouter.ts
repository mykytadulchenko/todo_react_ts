import express from 'express'
import { itemQueries } from '../db/queries/itemQueries.js'

const itemRouter = express.Router()

const dataRequestHandler = async (id: string) => {
    const data = await itemQueries.GET_ITEMS_QUERY(id)
    return data
}

itemRouter.options('/', (_, response, next) => {
    try {
        response.send()
    } catch(err) {
        next(err)
    }
})

itemRouter.get('/:id', async (request, response, next) => {
    try {
        const data = await dataRequestHandler(request.params.id)
        response.json(data)
    } catch(err) {
        next(err)
    }
})

itemRouter.post('/', async (request, response, next) => {
    try {
        await itemQueries.SET_ITEM_QUERY(request.body.value, false, request.body.userId)
        const newData = await dataRequestHandler(request.body.userId)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})

itemRouter.patch('/:id', async (request, response, next) => {
    try {
        const {_id, value, completed, user_id} = request.body
        await itemQueries.EDIT_ITEM_QUERY(value, completed, _id)
        const newData = await dataRequestHandler(user_id)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})

itemRouter.delete('/:id', async (request, response, next) => {
    try {
        await itemQueries.DELETE_ITEM_QUERY(request.body._id)
        const newData = await dataRequestHandler(request.body.user_id)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})

itemRouter.put('/bulk-select', async (request, response, next) => {
    try {
        await itemQueries.SELECT_ALL_QUERY(request.body.selectAll, request.body.userId)
        const newData = await dataRequestHandler(request.body.userId)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})

itemRouter.put('/bulk-remove', async (request, response, next) => {
    try {
        await itemQueries.DELETE_SELECTED(request.body.userId)
        const newData = await dataRequestHandler(request.body.userId)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})


export default itemRouter