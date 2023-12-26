import { createConnection } from "typeorm"
import dbData from "../connect.js"
import User from "../entities/User.js"

export const userQueries = {
    SET_USER_QUERY: async (login, email, password) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(User)
        const user = entityRepos.create({ login, email, password })
        const returnData = await entityRepos.save(user)
        await connection.close()
        return {
            id: returnData.id,
            login: returnData.login
        }
    },
    GET_USER_QUERY: async (login) => {
        const connection = await createConnection(dbData)
        const entityRepos = connection.getRepository(User)
        const user = await entityRepos.findOneBy({ login })
        await connection.close()
        return user
    }
}