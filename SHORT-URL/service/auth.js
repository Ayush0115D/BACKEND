const sessionIdToUserMap = new Map(); //jb bhi server ko refresh krege usermap khali ho jayega
function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}
function getUser(id) { 
    return sessionIdToUserMap.get(id);
}   
module.exports = {
    setUser,        
    getUser
};