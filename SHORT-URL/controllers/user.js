const{v4:uuidv4} = require('uuid');
const User=require('../models/user');
const{setUser} = require('../service/auth');
async function handleUserSignup(req,res){
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
res.render("home", { urls: [] }); // Render home page after signup:)
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user= await User.findOne({ email, password })
    if (!user) {
        return res.render("login",{error:"Invalid email or password",});
    } 
   const token= setUser( user);
   res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("token", token);
    // return res.json({token})
        // domain :"www.google.com", //localhost will not work because of this domain
        //domain:".piyushgarg.dev" //dot at start means subdomain,so it will work for all subdomains 
        //like "piyushgarg.dev or "blog.piyushgarg.dev"
        //eg-like if we login on google we automatically get logged in on youtube,gmail etc

    return res.redirect("/", ); 
}
    // Render home page after successful login :)  
module.exports = {
    handleUserSignup,
    handleUserLogin
};