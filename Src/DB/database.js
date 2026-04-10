import dotenv from 'dotenv'
dotenv.config()

import mongoose from "mongoose";
console.log(process.env.MONGODB_URL);

export default async function ConnectDB() {
    try {
        const connectionInstance = await mongoose.connect("MONGODB_URL=mongodb+srv://saksham07:agnihotri07@cluster0.oyg1cko.mongodb.net/car?retryWrites=true&w=majority&appName=Cluster0")
        console.log(`MONGO DB RUN ON ${connectionInstance.connection.host}`);
        
        
    } catch (error) {
        console.log(error);
        
    }
}