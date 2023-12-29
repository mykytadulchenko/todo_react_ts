import express from 'express'
import bcrypt from 'bcrypt'
import { userQueries } from '../db/queries/userQueries.js'

const usersRouter = express.Router()

const passwordHasher = async (password) => {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
}

const passwordCompare = async (password, hash) => {
    const result = await bcrypt.compare(password, hash)
    return result
}

usersRouter.post('/sign-in', async (request, response, next) => {
    try {
        const {login, password} = request.body
        const user = await userQueries.GET_USER_QUERY(login)
        if(user?.login === login && passwordCompare(password, user?.password)) {
            const userObject = {
                id: user.id,
                login: user.login
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
        const hashedPass = await passwordHasher(password)
        const user = await userQueries.SET_USER_QUERY(login, email, hashedPass)
        response.json(user)
    } catch(err) {
        next(err)
    }
})

export default usersRouter