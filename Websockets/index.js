const http=require("http")
const express=require("express");
const path=require("path");

const app=express();
const server=http.createServer(app);
app.use(express.static((path.resolve("./public"))));
app.get("/",(req,res)=>{
  res.sendFile(path.resolve("./public/index.html"));
});
server.listen(9000,()=>{
  console.log("Server started on port 9000");
});