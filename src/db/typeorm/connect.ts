import { configDotenv } from "dotenv"
import { DataSource } from "typeorm"
import Item from "./entities/Item.js"
import User from "./entities/User.js"
import Jwt from "./entities/Jwt.js"
import store from "../../store/store.js"
configDotenv()

const dbDataSource = new DataSource({
    type: "postgres",
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    entities: [User, Item, Jwt],
    synchronize: true
})

const initializeDatabase = async () => {
    if(!dbDataSource.isInitialized) await dbDataSource.initialize()
    return dbDataSource
}

export default initializeDatabase