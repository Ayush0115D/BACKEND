const express=require("express");
const urlRouter=require("./routes/url");
const {connectToMongoDB}=require("./connect");
const app=express();
const PORT=8001;
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("Connected to MongoDB"))
// app.use(express.json());
app.use("/url", urlRouter);
app.listen(PORT,()=>console.log(`server started at port:${PORT}`))

