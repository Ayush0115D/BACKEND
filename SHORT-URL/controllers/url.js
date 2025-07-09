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
});
return res.render("home", { id: shortId });
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