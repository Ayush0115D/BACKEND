
const users=require("./MOCK_DATA.json")
const app=express();
const port=8000;
const userRouter=require("./routes/user");
const connectMongoDb=require("./routes/user")

//MONGOOSE CONNECTION
// mongoose
// .connect("mongodb://127.0.0.1:27017/youtube-app-1")
// .then(()=>console.log("mongodb connected"))
// .catch((err)=>console.log("mongo error",err));

//connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")

//middleware-just like a plugin
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
   console.log("hello from middleware 1");
   req.myUserName="ayushdhakre.dev";
//    return res.json({mgs:"hello from middleware1"});
next();
})
app.use((req,res,next)=>{
   console.log("hello from middleware 2",req.myUserName);
// return res.end("hey")
next();
})
//Routes

// app.patch("/api/users/:id",(req,res)=>{
//     //todo:edit  user with id
//     return res.json({status:"pending"})
//     });
//  app.delete("/api/users/:id",(req,res)=>{
//     //todo:delete user with id
//     return res.json({status:"pending"})
//     });
//routes
app.use("./user",userRouter)
app.listen(port,()=>console.log(`server started at port:${port}`))