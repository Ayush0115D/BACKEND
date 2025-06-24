const http=require("http")
const fs=require("fs")
const url=require("url")
const myServer=http.createServer ((req,res)=>{
    if(req.url==="/favicon.ico") return res.end();
     
    const log=`${Date.now()} :${req.url } new request received \n`;
    const myUrl=url.parse(req.url,true)
    console.log(myUrl)
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(myUrl.pathname){
            case'/':res.end("homepage");
            break
            // case'/about':res.end("i am piyush garg");
            case '/about':
                const username=myUrl.query.myname;
                res.end(`Hi,${username}`);
            break;
            case '/search'://yt do like this
            const search= myUrl.query.search_query;
            res.end("here are your results for " + search)
            break;

            default:res.end("404 not found ")
        }
    // res.end("Hello from server again")
    })
    console.log(req)
// console.log("New req received")

});
myServer.listen(8000,()=>console.log("server started!"))