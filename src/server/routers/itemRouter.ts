
import { Router, type NextFunction, type Request, type Response } from 'express'
import { itemQueries } from '../../db/typeorm/queries/itemQueries.js'

const itemRouter = Router()

const dataRequestHandler = async (id: string) => {
    const data = await itemQueries.GET_ITEMS_QUERY(id)
    return data
}

itemRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const data = await dataRequestHandler(request.params.id)
        response.json({ data, token: request.token })
    } catch(err) {
        next(err)
    }
})

itemRouter.post('/', async (request, response, next) => {
    try {
        await itemQueries.SET_ITEM_QUERY(request.body.value, false, request.body.userId)
        const newData = await dataRequestHandler(request.body.userId)
        response.json({ data: newData, token: request.token })
    } catch(err) {
        next(err)
    }
})

itemRouter.patch('/:id', async (request, response, next) => {
    try {
        const {id, value, completed, user_id} = request.body
        await itemQueries.EDIT_ITEM_QUERY(value, completed, id)
        const newData = await dataRequestHandler(user_id)
        response.json({ data: newData, token: request.token })
    } catch(err) {
        next(err)
    }
})

itemRouter.delete('/:id', async (request, response, next) => {
    try {
        await itemQueries.DELETE_ITEM_QUERY(request.params.id)
        const newData = await dataRequestHandler(request.body.user_id)
        response.json({ data: newData, token: request.token })
    } catch(err) {
        next(err)
    }
})

itemRouter.put('/bulk-select', async (request, response, next) => {
    try {
        await itemQueries.SELECT_ALL_QUERY(request.body.selectAll, request.body.userId)
        const newData = await dataRequestHandler(request.body.userId)
        response.json({ data: newData, token: request.token })
    } catch(err) {
        next(err)
    }
})

itemRouter.put('/bulk-remove', async (request, response, next) => {
    try {
        await itemQueries.DELETE_SELECTED(request.body.userId)
        const newData = await dataRequestHandler(request.body.userId)
        response.json({ data: newData, token: request.token })
    } catch(err) {
        next(err)
    }
})


export default itemRouter