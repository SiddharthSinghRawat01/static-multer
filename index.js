const express = require("express");
const { json } = require("stream/consumers");
const multer = require('multer')
const path = require('path')
const app = express();

app.use('/static',express.static('public'))

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join('public/upload'));
    },
    filename : function(req, file, cb){
        let imgname = new Date().getTime();
        let imgext = path.extname(file.originalname);
        let image = `${imgname}${imgext}`;
        cb(null, image);
    }
})
const uploads = multer({ storage: storage });

app.post('/imageUpload',uploads.single("image"),async (req,res)=>{

    req.body.image = await req.file.filename;

    res.send(`/upload/${req.file.filename}`)
})


app.listen(5000,()=>{})