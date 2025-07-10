const User=require('../models/user');
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
    return res.render("home", { urls: [] } ); // Render home page after successful login :)
}   
module.exports = {
    handleUserSignup,
    handleUserLogin
};
