const path = require('path');
const multer = require('multer');
//uploading file configurations 
const Upload = (location) => {

    return multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb) {
                const MediaTypes = /jpg|jpeg|png|svg/;
                const TemplateTypes = /hbs/;
                if (MediaTypes.test(file.mimetype))
                    cb(null, `./public/uploads/${location}`);
                else if (TemplateTypes.test(file.mimetype))
                    cb(null, `./templates/views`);
                else
                    cb(null, false);

            },
            filename: function(req, file, cb) {
                // Allowed ext
                const filetypes = /hbs/;
                // Check ext
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                // Check mime
                const mimetype = filetypes.test(file.mimetype);

                if (mimetype && extname) {
                    cb(null, req.body.cvId + 'template'.trim());
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