const http=require("http")
const express=require("express");
const path=require("path");
const {Server}=require("socket.io")

const app=express();
const server=http.createServer(app);
const io=new Server(server);//handle sokets,express handle all htpp req.
//socket.io
io.on("connection", (socket) => {
  socket.on("user message", (message) => {
    console.log("Received user message:", message);
    // Broadcast to all connected clients (including sender)
    io.emit("chat message", message);
  });
});


app.use(express.static((path.resolve("./public"))));
app.get("/",(req,res)=>{
  res.sendFile(path.resolve("./public/index.html"));
});
server.listen(9000,()=>{
  console.log("Server started on port 9000");
});