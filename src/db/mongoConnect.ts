import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
configDotenv()

const mongooseConnect = async () => {
   await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`)
}

export default mongooseConnect