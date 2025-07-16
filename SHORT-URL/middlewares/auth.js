const { getUser } = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.headers["authorization"];
   if(!userUid) return res.redirect("/login");
const token = userUid.replace("Bearer", "").trim();
   const user=getUser(token);
   if (!user)   return res.redirect("/login");
        req.user = user;
        next();
}
async function checkAuth(req, res, next) {
    // const token = req.cookies?.uid;
       const userUid = req.headers["authorization"];
       if(!userUid) return res.redirect("/login");
const token = userUid.replace("Bearer", "").trim(); 
//Instead of using split(), use replace() and trim() to be safe and flexible:)
      const user=getUser(token);
      req.user = user;
    next();
}
module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth
};
