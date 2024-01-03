import { configDotenv } from "dotenv"
import mongoClient from "../mongoConnect.js"
import { ObjectId } from "mongodb"
configDotenv()

export const itemQueries = {
    GET_ITEMS_QUERY: async (id: string) => {
        await mongoClient.connect()
        const itemCollection = mongoClient.db(process.env.MONGO_DB).collection('items')
        let data = await itemCollection.find({ user_id: new ObjectId(id) }).toArray()
        await mongoClient.close()
        return data
    },
    SET_ITEM_QUERY: async (value: string, completed: boolean, user_id: string) => {
        await mongoClient.connect()
        const itemCollection = mongoClient.db(process.env.MONGO_DB).collection('items')
        const newId = new ObjectId()
        const creationDate = new Date()
        const newItem = {_id: newId, 
                        id: newId, 
                        value, 
                        completed, 
                        user_id: new ObjectId(user_id), 
                        created: creationDate, 
                        modified: creationDate}
        await itemCollection.insertOne(newItem)
        await mongoClient.close()
    },
    EDIT_ITEM_QUERY: async (value: string, completed: boolean, id: string) => {
        await mongoClient.connect()
        const itemCollection = mongoClient.db(process.env.MONGO_DB).collection('items')
        await itemCollection.updateOne({ id: new ObjectId(id) }, { $set: { value, completed , modified: new Date() } })
        await mongoClient.close()
    },
    DELETE_ITEM_QUERY: async (id: string) => {
        await mongoClient.connect()
        const itemCollection = mongoClient.db(process.env.MONGO_DB).collection('items')
        await itemCollection.deleteOne({ id: new ObjectId(id) })
        await mongoClient.close()
    },
    SELECT_ALL_QUERY: async (selectAll: boolean, user_id: string) => {
        await mongoClient.connect()
        const itemCollection = mongoClient.db(process.env.MONGO_DB).collection('items')
        await itemCollection.updateMany({ user_id: new ObjectId(user_id) }, { $set: { completed: selectAll } })
        await mongoClient.close()
    },
    DELETE_SELECTED: async (user_id: string) => {
        await mongoClient.connect()
        const itemCollection = mongoClient.db(process.env.MONGO_DB).collection('items')
        await itemCollection.deleteMany({ user_id: new ObjectId(user_id) })
        await mongoClient.close()
    }
}