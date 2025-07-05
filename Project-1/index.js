const express=require("express");
const fs=require("fs")
const mongoose=require("mongoose")
const users=require("./MOCK_DATA.json")
const app=express();
const port=8000;
//MONGOOSE CONNECTION
mongoose
.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("mongo error",err));
//Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String
    },
}, {timestamps:true});
const  User=mongoose.model("user",userSchema); //db apne ap plural me krdeta db.collection pe users ayega
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
app.get("/users",async(req,res)=>{
    const allDbUsers=await User.find({})
   const html=` <ul>
        ${allDbUsers.map((user)=> `<li>${user.firstName}-${user.email}</li>`).join("")}
    </ul>`;
    res.send( allDbUsers)
});
//REST Api
app.get("/api/users",async(req,res)=>{
    const allDbUsers=await User.find({})
    res.setHeader("X-myName","ayushh")
    //Always add X to custom headers
        console.log("i am in get route",req.myUserName)
    return res.json(allDbUsers);
});

app
.route("/api/users/:id")
.get (async(req,res)=>{
const user=await User.findById(req.params.id);
  //iske jgh ye   // const id=Number(req.params.id);
    // const user=users.find((user)=>user.id===id)
    if(!user) return res.status(404).json({error:"user not found"})
     return res.json(user);
})
.patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
    //edit user with id
    return res.json({status:"success"});
})
.delete(async(req,res)=>{
    await User.findByIdAndDelete (req.params.id,{lastName:"changed"});
    //delete user with id
    return res.json({status:"success"});
});
app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id)
     return res.json(user);
});
app.post("/api/users",async(req,res)=>{

    //todo:create new user
    const body=req.body
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
        {
        return res.status(400).json({msg:"all fields are required"})
    }
    // users.push({...body,id:users.length+1});
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    // return res.status(201).json({status:"success",id:users.length})
    // }) //postan se data update kra
    const result= await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
});
console.log("result",result);
 return res.status(201).json({msg:"success"})
    });
   
// app.patch("/api/users/:id",(req,res)=>{
//     //todo:edit  user with id
//     return res.json({status:"pending"})
//     });
//  app.delete("/api/users/:id",(req,res)=>{
//     //todo:delete user with id
//     return res.json({status:"pending"})
//     });

app.listen(port,()=>console.log(`server started at port:${port}`))