async function UpdateUserData(req, res, next) {
    console.log("body", req.body);
    if (req.user._id !== req.params.id) return next({ message: "Un-Authorized request", status: 401 });

    //check if already registered 
    let user = await req.DB_Scheme.User.findOne({ email: req.body.email });
    if (!user) return next({ status: 400, message: 'Not registered yet' });

    let result = await req.DB_Scheme.User.updateOne({ _id: req.params.id }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            profileImg: req.file.filename ? req.file.filename : user.profileImg,
            password: req.body.password ? req.body.password : user.password,
            plan: req.body.plan ? req.body.plan : user.plan
        }
    })
    if (!result) return next({ status: 400, message: "Bad Request" });
    return res.send(result);

}

module.exports = {
    UpdateUserData
}