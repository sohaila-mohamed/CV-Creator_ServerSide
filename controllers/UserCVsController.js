const _ = require('lodash');

async function AddCvByID(req, res, next) {
    //check if token matched with requested user 
    if (req.body.userId !== req.user._id) return next({ status: 401, message: "Access denied Invalid User token" });
    //get user from db
    let user = await req.DB_Scheme.User.findOne({ _id: req.body.userId })
        //check if user exist or not 
    if (!user) return next({ status: 404, message: "Not Found Invalid ID" });

    //get template from db 
    let temp = await req.DB_Scheme.templates.findOne({ templateId: req.body.tempId });
    if (!temp) return next({ status: 400, message: 'Error template not found ' })
        //add new cv
    console.log("template", JSON.parse(JSON.stringify(temp.data)), "type", typeof(JSON.parse(JSON.stringify(temp.data))));

    const _cv = new req.DB_Scheme.Cvs({
        templateId: req.body.tempId,
        data: temp.data,
        image: temp.image
    });

    let result = await req.DB_Scheme.User.updateOne({ _id: req.body.userId }, {
        $push: {
            cvs: _cv
        }
    }).catch((err) => {
        console.log("adding cv error : ", err);
    });
    if (!result) return next({ status: 400, message: "Bad Request" });
    //get template file path
    let path = req.body.tempId.toString() + "template";
    //send pre-rendered content to clientSide
    res.append("x-cv-token", _cv._id.toString());
    res.render(path, _cv.data);
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

const getUserPersonalData = async(req, res, next) => {
    //check if user authenticated 
    console.log("params.userId", req.params.userId);
    console.log("User.userId", req.user._id);
    if (req.params.userId !== req.user._id) return next({ status: 401, message: "Access denied Invalid User token" })
        //check if user data exist 
    let user = await req.DB_Scheme.User.findOne({ _id: req.params.userId });
    if (!user) return next({ status: 404, message: "Not Found Invalid ID" });
    //send cv list including cv id clientSide
    let resBody = _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'profileImg']);
    resBody.cvs = _.map(user.cvs, _.partialRight(_.pick, ['_id']));
    res.send(resBody);


}

const UpdateCv = async(req, res, next) => {
    //check if token matched with requested user 
    if (req.body.userId !== req.user._id) return next({ status: 401, message: "Access denied Invalid User token" });
    //get user from db
    let user = await req.DB_Scheme.User.findOne({ _id: req.body.userId })
        //check if user exist or not 
    if (!user) return next({ status: 404, message: "Not Found Invalid ID" });
    //get user cv data
    let cv = await user.cvs.find((cv) => cv._id == req.body.cvId);
    if (!cv) return next({ status: 422, message: "Not Found Invalid CV ID" });
    //update cv data with new data 
    cv.data = {...cv.data, ...req.body.data }
    let userCvs = user.cvs.filter((cv) => cv._id != req.body.cvId);
    user.cvs = userCvs.push(cv);
    let result = await req.DB_Scheme.User.updateOne({ _id: req.body.userId }, {
        $set: {
            cvs: userCvs
        }
    }).catch((err) => {
        console.log("adding cv error : ", err);
    });

    if (!result) return next({ status: 400, message: "Bad Request" });
    //get template file path
    let path = cv.templateId.toString() + "template";
    res.render(path, cv.data);




}


module.exports = {
    AddCvByID,
    getCvById,
    getUserCvListById,
    getUserPersonalData,
    UpdateCv
}