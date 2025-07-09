const express=require("express");
const urlRouter=require("./routes/url");
const {connectToMongoDB}=require("./connect");
const app=express();
const URL = require("./models/url");
const PORT=8001;
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("Connected to MongoDB"))
app.set("view engine", "ejs");
app.set("views", path.resolve ("/views"));
app.use(express.json());
app.use("/url", urlRouter);
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
  const entry= await URL.findOneAndUpdate(
        { 
           shortid: shortId 
        },
        {$push: { visitHistory: {timestamps:Date.now()},
         },
         },
        );
         res.redirect(entry.redirectUrl);
     });
app.listen(PORT,()=>console.log(`server started at port:${PORT}`))