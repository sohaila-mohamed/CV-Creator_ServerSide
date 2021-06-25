const path = require('path');
const multer = require('multer');
//uploading file configurations 
const Upload = (location) => {

    return multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb) {

                console.log("inside multer");
                const MediaTypes = /jpg|jpeg|png|svg/;
                const TemplateType = 'text/x-handlebars-template';
                if (MediaTypes.test(file.mimetype))
                    cb(null, `./public/uploads/${location}`);
                else if (TemplateType == (file.mimetype))
                    cb(null, `./templates/views`);
                else
                    cb(null, false);

            },
            filename: function(req, file, cb) {
                // Allowed ext
                console.log(file);
                const filetypes = /hbs/;
                // Check ext
                console.log(path.extname(file.originalname).toLowerCase());
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                // Check mime
                // const mimetype = filetypes.test(file.mimetype);

                if (file.mimetype == 'text/x-handlebars-template' && extname) {
                    console.log("is template");
                    cb(null, req.body.tempId + 'template'.trim() + path.extname(file.originalname).toLowerCase());
                } else {
                    console.log("Not Template")
                    cb(null, new Date().toISOString() + file.originalname.toString().trim());
                }

            }
        })
    });
}


module.exports = {
    Upload
}