import multer from "multer";
import express from "express";

const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
});

const upload = multer({ storage });

// single file upload
app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file)
    res.json({ success: true, filename: req.file.filename })
});

// multiple files
app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
    console.log(req.files)
    res.json({ success: true, files: req.files.map(f => f.filename) });
});

app.listen(4000, ()=> console.log('Server running on port 4000'))
