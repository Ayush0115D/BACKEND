const express=require("express");
const fs=require("fs");
const status=require("express-status-monitor");
const zlib=require("zlib");

const app=express();
const port=8000;
app.use(status());
//to zip sample.txt...Stream read->400mb(zip)->400mb write
//Stream read(sample.txt)->zipper->fs write stream
fs.createReadStream("./sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))); 
app.get("/",(req,res)=>{
   const stream=fs.createReadStream("./sample.txt","utf-8");
 stream.on("data",(chunk)=>res.write(chunk));
 stream.on("end",()=>res.end());
});
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
