const express=require("express");
const path=require("path");
const {connectToMongoDB}=require("./connect");
const app=express();

const URL = require("./models/url");
const staticRouter = require("./routes/StaticRouter");
const urlRouter = require("./routes/urlRouter");
const userRouter = require("./routes/user");
const PORT=8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("Connected to MongoDB"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

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