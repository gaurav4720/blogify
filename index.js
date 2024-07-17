const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const blog = require('./models/blog');

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

mongoose.connect('mongodb://localhost:27017/blogify').then((e) => {
    console.log("MongoDB Connected");
})

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
    const allBlogs = await blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
})

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => { console.log(`Server started at port ${PORT}`) });