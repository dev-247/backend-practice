import mongoose from "mongoose";

require('dotenv').config();
async function connectToMongo() {
    mongoose.connect(process.env.MONGO_URI).then(value => {
        console.log("connected to MongoDB...");
    }).catch(err => console.log(err));
}
exports.connectToMongo = connectToMongo;