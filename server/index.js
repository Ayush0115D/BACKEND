const http=require("http")
const fs=require("fs")
const myServer=http.createServer ((req,res)=>{
    const log=`${Date.now()} :${req.url } new request received \n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(req.url){
            case'/':res.end("homepage");
            break
            case'/about':res.end("i am piyush garg");
            break
            default:res.end("404 not found ")
        }
    // res.end("Hello from server again")
    })
    console.log(req)
// console.log("New req received")

});
myServer.listen(8000,()=>console.log("server started!"))
