import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

const itemSchema = new Schema({
    value: String,
    completed: Boolean,
    user_id: ObjectId,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

export default itemSchema