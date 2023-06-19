const multer = require("multer");
const uploadController = require("express").Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => { cb(null, req.body.filename) }
})

const upload = multer({ storage})

// upload single image it should conatin req.body
uploadController.post("/image", upload.single("image"), async (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});
module.exports = uploadController