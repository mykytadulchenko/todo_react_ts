import { ObjectId } from "mongodb"
import { Schema } from "mongoose"

const userSchema = new Schema({
    login: String,
    email: String,
    password: String
})

export default userSchema