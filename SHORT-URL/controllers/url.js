const{nanoid}=require('nanoid');
const URL = require('../models/url');
async function handleGenerateNewShortURL(req, res) {
const body = req.body;
if (!body.url)  return res.status(400).json({ error: "URL is required" });
const shortId = nanoid(10);
await URL.create({
shortid: shortId,   
redirectUrl: body.url, 
visitHistory: [], 
createdby:req.user._id, 
});
   // Fetch all URLs to pass to home.ejs
    const allUrls = await URL.find({});

    return res.render("home", {
        id: shortId,  // Pass the new shortId to the view
        urls: allUrls,   //  This is what your EJS file expects:)
    });
}
async function handleGetAnalytics(req, res) {
const shortId = req.params.shortId;
const result= await URL.findOne({ shortid: shortId })
return res.json({totalclicks: result.visitHistory.length,
    analytics: result.visitHistory});
}
module.exports = {
handleGenerateNewShortURL,
handleGetAnalytics,
};