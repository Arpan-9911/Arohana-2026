import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        const host = con.connection.host
        console.log(`MongoDB Successfully connected - Host: ${host}`);
    } catch (error) {
        console.error(`MongoDB Connection Failed Reason :${error.message}`);
        process.exit(1)
    }
}