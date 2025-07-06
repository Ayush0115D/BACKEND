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
    {
    date: {
        type: Date,
        default: Date.now
    },
    userAgent: {
        type: String,
        required: true
    }}
]
}, 
{timestamps: true}
);
const URL = moongoose.model("Url", urlSchema);
module.exports = URL;