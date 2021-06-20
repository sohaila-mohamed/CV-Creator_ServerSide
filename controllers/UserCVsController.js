const _ = require('lodash');

async function AddCvByID(req, res, next) {
    //check if token matched with requested user 
    if (req.body.userId !== req.user._id) return next({ status: 401, message: "Access denied Invalid User token" });
    //get user from db
    let user = await req.DB_Scheme.User.findOne({ _id: req.body.userId })
        //check if user exist or not 
    if (!user) return next({ status: 404, message: "Not Found Invalid ID" });
    //get user cvs copy
    console.log(user.cvs);
    let UserCvs = user.cvs.filter((item) => true);
    //add new cv
    const _cv = new req.DB_Scheme.Cvs({
        templateId: req.body.templateId,
        data: req.body.data
    });
    UserCvs.push(_cv);

    //add new cv to user cv list
    let result = await req.DB_Scheme.User.updateOne({ _id: req.body.userId }, {
        $set: {
            cvs: UserCvs
        }
    }).catch((err) => {
        console.log("adding cv error : ", err);

    });
    if (!result) return next({ status: 400, message: "Bad Request" });

    //get template file path
    let path = req.body.templateId.toString() + "template";
    console.log("_cv_id", _cv);
    //send pre-rendered content to clientSide
    res.header('x-cv-token', _cv._id).render(path, req.body.data);

    //send response to the client 
    // return res.send(_.pick(user, ['_id', 'username', 'email', 'age', 'city', 'profileImg']));


}

const getCvById = async(req, res, next) => {
    //check if token matched with requested user 
    if (req.params.userId !== req.user._id) return next({ status: 401, message: "Access denied Invalid User token" });
    //get user from db
    let user = await req.DB_Scheme.User.findOne({ _id: req.params.userId })
        //check if user exist or not 
    if (!user) return next({ status: 404, message: "Not Found Invalid ID" });
    //get user cv data
    let cv = await user.cvs.find((cv) => cv._id == req.params.cvId);
    if (!cv) return next({ status: 422, message: "Not Found Invalid CV ID" });

    //get template file path
    let path = cv.templateId.toString() + "template";

    //send pre-rendered content to clientSide
    res.render(path, cv.data);

}

const getUserCvListById = async(req, res, next) => {
    //check if token matched with requested user 
    if (req.params.userId !== req.user._id) return next({ status: 401, message: "Access denied Invalid User token" });
    //get user from db
    let user = await req.DB_Scheme.User.findOne({ _id: req.params.userId })
        //check if user exist or not 
    if (!user) return next({ status: 404, message: "Not Found Invalid ID" });
    //send cv list including cv id clientSide
    res.send(_.map(user.cvs, _.partialRight(_.pick, ['_id'])));

}




module.exports = {
    AddCvByID,
    getCvById,
    getUserCvListById
}