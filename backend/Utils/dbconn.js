const mongoose = require("mongoose")

const URL = process.env.MONGODB_URL

const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Hare Krishna");
        console.log("Database Connected");
    }
    catch (err) {
        console.error("database connection failed due to:"+err.message);
        process.exit(0);
    }
}

module.exports=connectDb; 