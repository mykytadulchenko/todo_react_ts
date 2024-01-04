import { configDotenv } from "dotenv"
import { ObjectId } from "mongodb"
import mongooseConnect from "../mongoConnect.js"
import mongoose from "mongoose"
import User from "../models/userModel.js"
configDotenv()

export const userQueries = {
    SET_USER_QUERY: async (login: string, email: string, password: string) => {
        await mongooseConnect()
        const user = await User.create({login, email, password })
        await mongoose.connection.close()
        return {
             id: user._id,
             login: user.login
        }
    },
    GET_USER_QUERY: async (login: string) => {
        await mongooseConnect()
        const user = await User.findOne({ login })
        await mongoose.connection.close()
        return user
    }
}