const express=require("express");
const router=express.Router();
//routes
// router.get("/users",async(req,res)=>{
//     const allDbUsers=await User.find({})
//    const html=` <ul>
//         ${allDbUsers.map((user)=> `<li>${user.firstName}-${user.email}</li>`).join("")}
//     </ul>`;
//     res.send( allDbUsers)
// });
//REST Api
router.get("",async(req,res)=>{
    const allDbUsers=await User.find({})
    res.setHeader("X-myName","ayushh")
    //Always add X to custom headers
        console.log("i am in get route",req.myUserName)
    return res.json(allDbUsers);
});

router
.route("/:id")
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
router.get("/",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id)
     return res.json(user);
});
router.post("/",async(req,res)=>{

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
    
    module.exports=router;
   