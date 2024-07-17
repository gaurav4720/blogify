const { Router } = require('express');
const multer = require('multer');
const path = require("path");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/${req.user._id}`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    res.render('addBlog', {
        user: req.user
    })
});

router.post("/", upload.single('coverImage'), (req, res) => {
    console.log(req.file);
})

module.exports = router;