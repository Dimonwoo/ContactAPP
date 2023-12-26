const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app=express();
const dotenv = require("dotenv").config();
const port = process.env.PORT||3000;
connectDb();
app.use(express.json());
app.use(errorHandler)

app.use("/api/v1/contacts", require("./routes/contactRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

app.listen(port, ()=>{
    console.log(`server is running on the port ${port}`);
})