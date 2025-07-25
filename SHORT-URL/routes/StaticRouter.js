const express= require("express");
const router = express.Router();
const { restrictTo } = require("../middlewares/auth");
const URL = require("../models/url");
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,
    }); 
});

router.get("/",restrictTo(["NORMAL","ADMIN"]), async(req, res) => {  
    const allurls= await URL.find({createdby: req.user._id}); 
    return res.render("home",{
        urls: allurls,
        
    });
});
router.get("/signup", (req, res) => {
    return res.render("signup");
});
router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;