const jwt = require('jsonwebtoken');
const config = require("config");
const { validateSession } = require('../controllers/SessionAuthController');

function Authenticate(req, res, next) {
    const sessionId = req.header('x-session-id');
    const token = req.header('x-login-auth-token');

    if (!sessionId) return res.status(401).send("Access denied, no session-id provided in request header ");
    // check if session expired
    else if (!validateSession(sessionId)) {
        //reset headers to delete session_id and user token 
        res.set({});
        res.status(400).send("Session Expired");
    }
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