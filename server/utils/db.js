import mongoose from "mongoose"

const mongo_db_uri = process.env.MONGODB_URI

const dbConnection = mongoose.connect(mongo_db_uri)

export default dbConnection