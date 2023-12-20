import express from 'express'
import pool from '../db/dbAuth.js'
import queries from '../db/dbQueries.js'

const router = express.Router()

router.options('/', (_, response) => {
    try {
        response.send()
    } catch(err) {
        next(err)
    }
})

router.get('/', async (_, response, next) => {
    try {
        const data = await pool.query(queries.GET_ITEMS_QUERY)
        response.json(data.rows)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (request, response, next) => {
    try {
        await pool.query(queries.SET_ITEM_QUERY, [request.body.value, false])
        const newData = await pool.query(queries.GET_ITEMS_QUERY)
        response.json(newData.rows)
    } catch(err) {
        next(err)
    }
})

router.patch('/:id', async (request, response, next) => {
    try {
        const {id, value, isFinished} = request.body
        await pool.query(queries.EDIT_ITEM_QUERY, [value, isFinished, id])
        const newData = await pool.query(queries.GET_ITEMS_QUERY)
        response.json(newData.rows)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (request, response, next) => {
    try {
        await pool.query(queries.DELETE_ITEM_QUERY, [request.body.id])
        const newData = await pool.query(queries.GET_ITEMS_QUERY)
        response.json(newData.rows)
    } catch(err) {
        next(err)
    }
})

router.put('/bulk-select', async (request, response, next) => {
    try {
        await pool.query(queries.SELECT_ALL_QUERY, [request.body.selectAll])
        const newData = await pool.query(queries.GET_ITEMS_QUERY)
        response.json(newData.rows)
    } catch(err) {
        next(err)
    }
})

router.put('/bulk-remove', async (_, response, next) => {
    try {
        await pool.query(queries.DELETE_SELECTED)
        const newData = await pool.query(queries.GET_ITEMS_QUERY)
        response.json(newData.rows)
    } catch(err) {
        next(err)
    }
})


export default router