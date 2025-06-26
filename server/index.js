// const http=require("http")
// const fs=require("fs")
// const url=require("url")
const express=require("express");
const app =express();
app.get("/",(req,res)=>{
    return res.send("hello from homepage");
});
app.get("/about",(req,res)=>{
    return res.send("hello from aboutpage"+'hey'+req.query.name+'you are'+req.query.age);
});

// function myHandler(req,res){

    // if(req.url==="/favicon.ico") return res.end();
     
    // const log=`${Date.now()}:${req.method} :${req.url } new request received \n`;
    // const myUrl=url.parse(req.url,true)
    // console.log(myUrl)
    // fs.appendFile("log.txt",log,(err,data)=>{
    //     switch(myUrl.pathname){
    //         case'/':
    //         if(req.method==='GET')res.end("homepage");
    //         break
    //         // case'/about':res.end("i am piyush garg");
    //         case '/about':
    //             const username=myUrl.query.myname;
    //             res.end(`Hi,${username}`);
    //         break;
    //         case '/search'://yt do like this
    //         const search= myUrl.query.search_query;
    //         res.end("here are your results for " + search)
    //         break;
    //         case"/signup":
    //         if(req.method==="GET")res.end("this ids a signup form")
    //             else if(req.method==='POST'){
    //         //db query
    //         res.end("success")
    //             }
    //         default:res.end("404 not found ")
    //     }
    // res.end("Hello from server again")
    // })
    // console.log(req)
// console.log("New req received")

// };
app.listen(8000,()=>console.log("server started!"))// http not required in express,internally acquire http module
// const myServer=http.createServer(app);
// myServer.listen(8000,()=>console.log("server started!"))