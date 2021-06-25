const generateSessionToken = () => {
    return new Date().getTime().toString();
}

const validateSession = (sessionId) => {
    let lastUpdate = parseInt(sessionId);
    let CurrentDate = parseInt(new Date().getTime().toString());
    console.log("lastUpdate", lastUpdate);
    console.log("CurrentDate", CurrentDate);
    console.log("session validation ", CurrentDate - lastUpdate < 10800000);
    return CurrentDate - lastUpdate < 10800000;
}

const revokeSessionId = () => {
    return (new Date().getTime() - 10800000).toString();
}


module.exports = {
    generateSessionToken,
    validateSession,
    revokeSessionId
}