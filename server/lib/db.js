import mongoose from "mongoose"

const mongo_db_uri = process.env.MONGO_DB_URI

const dbConnection = mongoose.connect(mongo_db_uri)

export default dbConnection