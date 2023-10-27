const multer = require('multer');
const path = require('path');

// config for upload
const dishImageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage: dishImageConfig});
module.exports = upload;