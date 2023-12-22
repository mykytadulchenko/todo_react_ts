import express from 'express'
import pool from '../db/dbAuth.js'
import { itemQueries } from '../db/dbQueries.js'

const itemsRouter = express.Router()
const dataRequestHandler = async (id) => {
    const data = await pool.query(itemQueries.GET_ITEMS_QUERY, [id])
    return data.rows
}

itemsRouter.options('/', (_, response, next) => {
    try {
        response.send()
    } catch(err) {
        next(err)
    }
})

itemsRouter.get('/:id', async (request, response, next) => {
    try {
        const data = await dataRequestHandler(request.params.id)
        response.json(data)
    } catch(err) {
        next(err)
    }
})

itemsRouter.post('/', async (request, response, next) => {
    try {
        await pool.query(itemQueries.SET_ITEM_QUERY, [request.body.value, false, request.body.userId])
        const newData = await dataRequestHandler(request.body.userId)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})

itemsRouter.patch('/:id', async (request, response, next) => {
    try {
        const {id, value, isFinished, user_id} = request.body
        await pool.query(itemQueries.EDIT_ITEM_QUERY, [value, isFinished, id])
        const newData = await dataRequestHandler(user_id)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})

itemsRouter.delete('/:id', async (request, response, next) => {
    try {
        await pool.query(itemQueries.DELETE_ITEM_QUERY, [request.body.id])
        const newData = await dataRequestHandler(request.body.user_id)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})

itemsRouter.put('/bulk-select', async (request, response, next) => {
    try {
        await pool.query(itemQueries.SELECT_ALL_QUERY, [request.body.selectAll, request.body.userId])
        const newData = await dataRequestHandler(request.body.userId)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})

itemsRouter.put('/bulk-remove', async (request, response, next) => {
    try {
        await pool.query(itemQueries.DELETE_SELECTED, [request.body.userId])
        const newData = await dataRequestHandler(request.body.userId)
        response.json(newData)
    } catch(err) {
        next(err)
    }
})


export default itemsRouter