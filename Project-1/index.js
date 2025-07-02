const express=require("express");
const fs=require("fs")
const users=require("./MOCK_DATA.json")
const app=express();
const port=8000;
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
app.get("/users",(req,res)=>{
   const html=` <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send( html)
});
//REST Api
app.get("/api/users",(req,res)=>{
    res.setHeader("X-myName","ayushh")
        console.log("i am in get route",req.myUserName)
    return res.json(users);
});

app
.route("/api/users/:id")
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id)
     return res.json(user);
})
.patch((req,res)=>{
    //edit user with id
    return res.json({status:"pending"});
})
.delete((req,res)=>{
    //delete user with id
    return res.json({status:"pending"});
});
app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id)
     return res.json(user);
});
app.post("/api/users",(req,res)=>{
    //todo:create new user
    const body=req.body
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.status(201).json({status:"success",id:users.length})
    })

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