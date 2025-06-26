const fs=require("fs");
const os=require("os")
console.log(os.cpus().length)
console.log("1")

//non blocking opern..ye hume async result deta
fs.readFile("./contact.txt","utf-8",(err,result)=>{
    console.log(result)
});
console.log("2")
console.log("3")
console.log("4")
