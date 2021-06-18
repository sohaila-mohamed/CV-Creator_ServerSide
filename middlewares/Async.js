function AsyncMiddleware(handler) {
    return async(req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            next({ status: 505, message: "internal server error", err: err });

        }

    }

}

module.exports = {
    AsyncMiddleware
}