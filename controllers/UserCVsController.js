const _ = require('lodash');

async function AddCvByID(req, res) {
    //check if token matched with requested user 
    if (req.body.userId !== req.user._id) return next({ status: 401, message: "Access denied Invalid User token" });
    //get user from db
    let user = await req.DB_Scheme.User.findOne({ _id: req.body.userId })
        //check if user exist or not 
    if (!user) return next({ status: 404, message: "Not Found Invalid ID" });
    //get user cvs copy
    console.log(user.cvs);
    let UserCvs = user.cvs.filter((item) => true);
    //generate token for cv 
    let cv_token = req.DB_Scheme.getCvToken({ user_id: req.body.userId, temp_id: req.body.templateId, date: new Date().toISOString().trim() });

    //add new cv
    const _cv = new req.DB_Scheme.Cvs({
        cvId: cv_token,
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

    //send pre-rendered content to clientSide
    res.render(path, req.body.data);

    //send response to the client 
    // return res.send(_.pick(user, ['_id', 'username', 'email', 'age', 'city', 'profileImg']));


}
module.exports = {
    AddCvByID
}