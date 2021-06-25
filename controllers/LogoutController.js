const { revokeSessionId } = require('../controllers/SessionAuthController');
const Logout = (req, res, next) => {
    res.set({
        'x-session-id': revokeSessionId(),
    });
    res.send();

}
module.exports = {
    Logout
}