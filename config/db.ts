import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log("connected to mongodb success...")
    } catch (error) {
        console.log("connected to mongodb failed...", error)
        process.exit(1)
    }
}

export default dbConnect