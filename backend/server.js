const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
// const appWs = express('appWs')(app);
const authRoute = require("./Routes/auth_router");
const connectDb = require("./Utils/dbconn");
const errorMiddleware = require("./Middlewares/error_middleware");



const corsOptions  = {
    origin: "http://localhost:3000",
    method:  'GET, POST',
    credentials : true,
};


app.use(cors(corsOptions)); // handling cors error

app.use(express.json());  // middleware for parsing application/json


app.use("/", authRoute);


app.use(errorMiddleware);


const PORT = process.env.PORT;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`The Server is running on ${PORT}`);
    });
});
