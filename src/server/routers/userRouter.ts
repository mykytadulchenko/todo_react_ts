import bcrypt from 'bcrypt'
import { configDotenv } from 'dotenv'
import express from 'express'
import { userQueries } from '../../db/typeorm/queries/userQueries.js'
import type { IUser } from '../../types/'
import jwtResolver from '../auth/jwtResolver.js'
import tokenRefresher from '../auth/tokenRefresher.js'
configDotenv()

const userRouter = express.Router()

const passwordHasher = async (password: string) => {
    const saltRounds = Number(process.env.SALT_ROUNDS)
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
}

const passwordCompare = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password, hash)
    return result
}

userRouter.post('/sign-in', async (request, response, next) => {
    try {
        const {login, password} = request.body as IUser
        const user = await userQueries.GET_USER_QUERY(login)
        if(!user) {
            response.json(null)
            return
        }
        const compareResult = await passwordCompare(password!, user.password!)
        if(user.login === login && compareResult) { 
            const userObject = {
                id: user.id,
                login: user.login
            }
            const { access_token } = await jwtResolver.getTokens(userObject.id)
            const token = tokenRefresher(access_token)
            if(typeof token === 'object') {
                const { accessToken, refreshToken } = jwtResolver.generateTokens(userObject)
                await jwtResolver.setTokens(userObject.id, accessToken, refreshToken)
                response.json(accessToken)
            } else {
                response.json(token)
            }
        } else {
            response.json(null)
        }
    } catch(err) {
        next(err)
    }
})

userRouter.post('/sign-up', async (request, response, next) => {
    try {
        const {login, email, password} = request.body as IUser
        const hashedPass = await passwordHasher(password!)
        const user = await userQueries.SET_USER_QUERY(login, email!, hashedPass)
        const { access_token } = await jwtResolver.getTokens(user.id)
        const token = tokenRefresher(access_token)
        if(typeof token === 'object') {
            const { accessToken, refreshToken } = jwtResolver.generateTokens(user)
            await jwtResolver.setTokens(user.id, accessToken, refreshToken)
            response.json(accessToken)
        } else {
            response.json(token)
        }
    } catch(err) {
        next(err)
    }
})

export default userRouter