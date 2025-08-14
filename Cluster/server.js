const cluster=require("cluster");
const os=require("os"); 
const express=require("express");
const totalCPUs=os.cpus().length;
// console.log(`Total CPUs: ${totalCPUs}`);
if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {
   const app=express();
   const PORT=8001;
   app.get("/",(req,res)=>{
    return res.json({
        message:`hello from express Server ${process.pid}` });
});
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}