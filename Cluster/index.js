const express=require("express");
const app=express();
const PORT=8001;
app.get("/",(req,res)=>{
    return res.json({
        message:"Welcome to the express Server" });
});
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`));