import express from 'express'
import pool from '../db/dbAuth.js'
import { userQueries } from '../db/dbQueries.js'

const usersRouter = express.Router()

usersRouter.post('/sign-in', async (request, response, next) => {
    try {
        const {login, password} = request.body
        const user = await pool.query(userQueries.GET_USER_QUERY, [login])
        if(user.rows[0]?.login === login && user.rows[0]?.password === password) {
            const userObject = {
                id: user.rows[0].id,
                login: user.rows[0].login
            }
            response.json(userObject)
        } else {
            response.json(null)
        }
    } catch(err) {
        next(err)
    }
})

usersRouter.post('/sign-up', async (request, response, next) => {
    try {
        const {login, email, password} = request.body
        const user = await pool.query(userQueries.SET_USER_QUERY, [login, email, password])
        response.json(user.rows[0])
    } catch(err) {
        next(err)
    }
})

export default usersRouter