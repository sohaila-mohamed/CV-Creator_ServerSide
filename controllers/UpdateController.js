async function UpdateUserData(req, res, next) {
    console.log("body", req.body);
    if (req.user._id !== req.params.id) return next({ message: "Un-Authorized request", status: 401 });

    //check if already registered 
    let user = await req.DB_Scheme.User.findOne({ _id: req.params.id });
    if (!user) return next({ status: 400, message: 'Not registered yet' });

    let result = await req.DB_Scheme.User.updateOne({ _id: req.params.id }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email === user.email ? user.email : req.body.email,
            profileImg: req.file.filename ? req.file.filename : user.profileImg,
            plan: req.body.plan ? req.body.plan : user.plan
        }
    }).catch((err) => {
        console.log("update error");
        if (err.name === 'MongoError' && err.code === 11000) {
            if (err.keyPattern.hasOwnProperty('email'))
                next({ status: 422, message: ` invalid email`, err: err })
            else if (err.keyPattern.hasOwnProperty('password'))
                next({ status: 422, message: ` invalid password`, err: err })
            else
                next({ status: 422, message: ` invalid update`, err: err })
        }


    });
    if (!result) return next({ status: 400, message: "Bad Request" });
    return res.header('x-sessionId', ).send(result);

}

module.exports = {
    UpdateUserData
}