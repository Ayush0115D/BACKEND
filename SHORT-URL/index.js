const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const staticRouter = require("./routes/StaticRouter");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8001;

// ✅ Connect to MongoDB
connectToMongoDB('mongodb://localhost:27017/short-url')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// ✅ Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ✅ Routers
app.use("/user", userRouter);
app.use("/", staticRouter);

// ✅ Short URL redirect handler
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortid: shortId },
      { $push: { visitHistory: { timestamps: Date.now() } } }
    );

    // ✅ Prevent crash if shortId is not found
    if (!entry) {
      return res.status(404).send("❌ Short URL not found");
    }

    res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("❌ Error during redirection:", err.message);
    res.status(500).send("Something went wrong");
  }
});

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server started at http://localhost:${PORT}`));
