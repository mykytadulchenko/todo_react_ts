import { configDotenv } from "dotenv"
import mongoClient from "../mongoConnect.js"
import { ObjectId } from "mongodb"
configDotenv()

export const userQueries = {
    SET_USER_QUERY: async (login, email, password) => {
        await mongoClient.connect()
        const userCollection = mongoClient.db(process.env.MONGO_DB).collection('users')
        const newId = new ObjectId()
        const user = await userCollection.insertOne({_id: newId, id: newId, login, email, password })
        await mongoClient.close()
        return {
             id: user.insertedId,
             login
         }
    },
    GET_USER_QUERY: async (login) => {
        await mongoClient.connect()
        const userCollection = mongoClient.db(process.env.MONGO_DB).collection('users')
        const user = await userCollection.findOne({ login })
        await mongoClient.close()
        return user
    }
}