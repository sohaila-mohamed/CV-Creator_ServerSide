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
    //add new cv
    UserCvs.push(new Date().toISOString() + user._id + req.body.cvId);

    let result = await req.DB_Scheme.User.updateOne({ _id: req.body.userId }, {
        $set: {
            cvs: UserCvs.filter((item) => true)
        }
    }).catch((err) => {
        console.log("adding cv error : ", err);

    });
    if (!result) return next({ status: 400, message: "Bad Request" });
    return res.sendFile('2021-06-19T20:44:26.482Zindex.js', { root: './uploads/templates' });

    //send response to the client 
    // return res.send(_.pick(user, ['_id', 'username', 'email', 'age', 'city', 'profileImg']));


}
module.exports = {
    AddCvByID
}