const jwt = require('jsonwebtoken');\
const secret="ayushd1234";
const sessionIdToUserMap = new Map(); //jb bhi server ko refresh krege usermap khali ho jayega
function setUser( user) {
    const payload = {
        id,
         ...user,
}
return jwt.sign(payload,secret)
}
function getUser(id) { 
    return sessionIdToUserMap.get(id);
}   
module.exports = {
    setUser,        
    getUser
};