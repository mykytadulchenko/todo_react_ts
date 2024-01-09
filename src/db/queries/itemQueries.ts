import { configDotenv } from "dotenv"
import { ObjectId } from "mongodb"
import mongoose from "mongoose"
import Item from "../models/itemModel.js"
import mongooseConnect from "../mongoConnect.js"
configDotenv()

export const itemQueries = {
    GET_ITEMS_QUERY: async (id: string) => {
        await mongooseConnect()
        let data = await Item.find({ user_id: new ObjectId(id) })
        await mongoose.connection.close()
        return data
    },
    SET_ITEM_QUERY: async (value: string, completed: boolean, user_id: string) => {
        await mongooseConnect()
        const newItem = {value, 
                        completed, 
                        user_id: new ObjectId(user_id)}
        await Item.create(newItem)
        await mongoose.connection.close()
    },
    EDIT_ITEM_QUERY: async (value: string, completed: boolean, id: string) => {
        await mongooseConnect()
        await Item.updateOne({ _id: new ObjectId(id) }, { $set: { value, completed } })
        await mongoose.connection.close()
    },
    DELETE_ITEM_QUERY: async (id: string) => {
        await mongooseConnect()
        await Item.deleteOne({ _id: new ObjectId(id) })
        await mongoose.connection.close()
    },
    SELECT_ALL_QUERY: async (selectAll: boolean, user_id: string) => {
        await mongooseConnect()
        await Item.updateMany({ user_id: new ObjectId(user_id) }, { $set: { completed: selectAll } })
        await mongoose.connection.close()
    },
    DELETE_SELECTED: async (user_id: string) => {
        await mongooseConnect()
        await Item.deleteMany({ user_id: new ObjectId(user_id), completed: true })
        await mongoose.connection.close()
    }
}