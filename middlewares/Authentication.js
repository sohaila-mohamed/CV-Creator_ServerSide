const jwt = require('jsonwebtoken');
const config = require("config");

function Authenticate(req, res, next) {

    const token = req.header('x-login-auth-token');
    if (!token) return res.status(401).send("Access denied, no token provided in request header ");

    try {
        let decode = jwt.verify(token, config.get('Users.Login.JWTPrivateKey'));
        req.user = decode;
        console.log("decode", decode);
        next();
    } catch (err) {
        console.log("error ", err);
        res.status(400).send("invalid token");
        return

    }



}

module.exports = {
    Authenticate
}