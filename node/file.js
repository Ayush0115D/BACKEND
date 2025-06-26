const fs=require("fs");
//sync ...blocking
// fs.writeFileSync("./test.txt","helloworld");
//async...non blocking
// fs.writeFile("./test.txt","helloworld",(err)=>{});

// const result= fs.readFileSync("./contact.txt","utf-8") // standard encoding
// console.log(result);

// fs.readFile("./contact.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("error",err);
//     } else {
//         console.log(result);
//     }
// });

fs.appendFileSync("./test.txt",`${Date.now()}hey there\n`);

//  fs.cpSync("./test.txt","./copy.txt")
//  fs.unlinkSync(",.test.txt") //delete
console.log(fs.statSync("./copy.txt"));
fs.mkdirSync("my-docs/a/b",{recursive:true});//makedirectory