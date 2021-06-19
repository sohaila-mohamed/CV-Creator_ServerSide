function ErrorHandler(error, req, res, next) {
    console.log("error middleware", error);
    res.status(error.status).send(error.message);
}

module.exports = {
    ErrorHandler
}