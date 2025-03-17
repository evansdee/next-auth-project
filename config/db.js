
import mongoose from 'mongoose';


const connectToDb = async()  =>{

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message  || err}`);
        process.exit(1);
    }
}

export default connectToDb