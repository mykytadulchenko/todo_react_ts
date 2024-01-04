import mongoose from "mongoose";
import itemSchema from "../schemes/itemSchema.js";

const Item = mongoose.model('Item', itemSchema, 'items')

export default Item