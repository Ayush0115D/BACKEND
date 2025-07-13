const jwt = require('jsonwebtoken');
const secret="ayushd*1#";
const sessionIdToUserMap = new Map(); //jb bhi server ko refresh krege usermap khali ho jayega
function setUser( user) {
    return jwt.sign({
       _id: user._id,
        email: user.email
    },secret)

}
function getUser(token) { 
    if (!token) return null;
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return null;
    }
}   
module.exports = {
    setUser,        
    getUser
};