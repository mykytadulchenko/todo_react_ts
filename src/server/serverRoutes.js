import express from 'express'
import pool from '../db/dbAuth.js'
import { DELETE_POST_QUERY, DELETE_SELECTED, EDIT_POST_QUERY, GET_POSTS_QUERY, SELECT_ALL_QUERY, SET_POST_QUERY } from '../db/dbQueries.js'

const router = express.Router()

router.options('/', (request, response) => {
    response.send()
})

router.get('/', async (request, response) => {
    const data = await pool.query(GET_POSTS_QUERY)
    response.json(data.rows)
})

router.post('/', async (request, response) => {
    await pool.query(SET_POST_QUERY, [request.body.value, false])
    const newData = await pool.query(GET_POSTS_QUERY)
    response.json(newData.rows)
})

router.patch('/:id', async (request, response) => {
    const {value, isFinished} = request.body
    await pool.query(EDIT_POST_QUERY, [value, isFinished, request.params.id])
    const newData = await pool.query(GET_POSTS_QUERY)
    response.json(newData.rows)
})

router.delete('/:id', async (request, response) => {
    await pool.query(DELETE_POST_QUERY, [request.params.id])
    const newData = await pool.query(GET_POSTS_QUERY)
    response.json(newData.rows)
})

router.put('/bulk-select', async (request, response) => {
    await pool.query(SELECT_ALL_QUERY, [request.body.selectAll])
    const newData = await pool.query(GET_POSTS_QUERY)
    response.json(newData.rows)
})

router.put('/bulk-remove', async (request, response) => {
    await pool.query(DELETE_SELECTED)
    const newData = await pool.query(GET_POSTS_QUERY)
    response.json(newData.rows)
})

export default router