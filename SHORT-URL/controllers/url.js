const{nanoId}=require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
const body = req.body;
if (!body.url)  return res.status(400).json({ error: "URL is required" });
const shortId = nanoId(10);
await URL.create({
shortid: shortId,   
redirectUrl: body.url, 
visitHistory: [], 
});
return res.status({id: shortId});
}
module.exports = {
handleGenerateNewShortURL,  
};