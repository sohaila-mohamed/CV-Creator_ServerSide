const generateSessionToken = () => {
    return new Date().getTime().toString();
}

const validateSession = (sessionId, tokeId) => {
    let lastUpdate = parseInt(sessionId);
    let CurrentDate = tokeId ? tokeId : parseInt(new Date().getTime().toString());
    console.log("lastUpdate", lastUpdate);
    console.log("CurrentDate", CurrentDate);
    console.log("session validation ", CurrentDate - lastUpdate < 10800000);
    return CurrentDate - lastUpdate < 10800000;
}



module.exports = {
    generateSessionToken,
    validateSession
}