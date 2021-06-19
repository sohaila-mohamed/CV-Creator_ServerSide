const path = require('path');
const multer = require('multer');
//uploading file configurations 
const Upload = (location) => {

    return multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, `./uploads/${location}`);

            },
            filename: function(req, file, cb) {
                // Allowed ext
                const filetypes = /html|css|js/;
                // Check ext
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                // Check mime
                const mimetype = filetypes.test(file.mimetype);

                if (mimetype && extname) {
                    cb(null, req.body.cvId + file.originalname.toString().trim());
                } else {
                    cb(null, new Date().toISOString() + file.originalname.toString().trim());
                }

            }
        })
    });
}


module.exports = {
    Upload
}