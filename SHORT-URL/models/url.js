const moongoose = require("mongoose");
const urlSchema = new moongoose.Schema({
shortid: {
    type: String,
    required: true,
    unique: true
},
redirectUrl: {
    type: String,
    required: true
},
visitHistory: [ 
 {timestamps: {type:Number}}],
}, 
{timestamps: true}
);
const URL = moongoose.model("Url", urlSchema);
module.exports = URL;