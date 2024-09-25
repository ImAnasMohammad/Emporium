const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { encode } = require('blurhash');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js')



// Create storage engine with dynamic path
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dynamicPath = `../../Uploads`;
        const uploadPath = path.join(__dirname, 'uploads', dynamicPath);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    }
}).array('images', 4); // Allow up to 10 images at a time

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|webp|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Generate BlurHash
async function generateBlurHash(imagePath) {
    const image = await sharp(imagePath).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
    const { data, info } = image;
    return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
}


// Route to handle image upload
router.post('/',authMiddleware,adminMiddleware, uploadPhotos);
router.get('/:name', getPhotos);

// Endpoint to serve images
function getPhotos(req,res){
    const filename = req.params?.name ?? '';
    if(filename ==='' ) return res.json({success:false,msg:"Invalid URL"})
    const filepath = path.join(__dirname,'..', 'Uploads',filename);
    if (fs.existsSync(filepath)) {
      res.sendFile(filepath);
    } else {
      res.json({success:false,msg:'File not found'});
    }
}


function uploadPhotos(req, res){
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ success:false,message: err.message });
        } else {
            if (req.files == undefined || req.files.length === 0) {
                return res.json({success:false,message: 'No files selected!' });
            } else {
                try {
                    const fileInfos = await Promise.all(req.files.map(async (file) => {
                        const blurHash = await generateBlurHash(file.path);
                        return {
                            name: file.filename,
                            blurHash: blurHash
                        };
                    }));

                    return res.json({
                        success:true,
                        message: 'Files uploaded!',
                        files: fileInfos
                    });
                } catch (error) {
                  return res.json({ success:false,message: 'Error generating BlurHash', error: error.message });
                }
            }
        }
    });
};


module.exports =  router