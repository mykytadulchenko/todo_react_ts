import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
configDotenv()

const mongoClient = new MongoClient(process.env.MONGO_URI)

export default mongoClient