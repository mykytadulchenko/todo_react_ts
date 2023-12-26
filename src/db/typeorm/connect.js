import Item from "./entities/Item.js"
import User from "./entities/User.js"
import { configDotenv } from "dotenv"
configDotenv()

const dbData = {
    type: "postgres",
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    entities: [User, Item],
    uuidExtension: "uuid-ossp"
}

export default dbData