const { getUser } = require('../service/auth');

 function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
 req.user=null;
 if (!tokenCookie) return next(); 
 const token=tokenCookie;
const user=getUser(token);

 req.user=user;
  return next();
}
//Admin,normal user roles
function restrictTo(roles=[]){
return function(req, res, next) {
    if(!req.user) return res.redirect("/login");
    if(!roles.includes(req.user.role)) return res.end("You are not authorized to access this page");
    return next();
};
}
// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.headers["authorization"];
//    if(!userUid) return res.redirect("/login");
// const token = userUid.replace("Bearer", "").trim();
//    const user=getUser(token);
//    if (!user)   return res.redirect("/login");
//         req.user = user;
//         next();
// }
// async function checkAuth(req, res, next) {
//     // const token = req.cookies?.uid;
//        const userUid = req.headers["authorization"];
//        if(!userUid) return res.redirect("/login");
// const token = userUid.replace("Bearer", "").trim(); 
// //Instead of using split(), use replace() and trim() to be safe and flexible:)
//       const user=getUser(token);
//       req.user = user;
//     next();
// }
module.exports = {
    // restrictToLoggedinUserOnly,
    // checkAuth
    checkForAuthentication,
    restrictTo
};
