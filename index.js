const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const config = require('config');
const hbs = require('hbs');
const app = express();
const DB = require('./database/DatabaseConnection');
const Main_Router = require('./routers/MainRouter');
const { ErrorHandler } = require('./middlewares/Error');
//checking for environment variables 
if (!config.has('Users.dbConfig.DBConnectionString')) {
    console.log("Fatal Error, Server Can't Start");
    process.exit(1);
}
if (!config.has('Users.Login.JWTPrivateKey')) {
    console.log("Fatal Error, Server Can't Start please set password first");
    process.exit(1);
}

//Server Configurations 
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}



//DB Connection 
try {
    db = new DB(config);
    db.connect().then(() => { if (db.connected) return }).then(() => {
        app.listen(config.get("server.port"), () => {
            console.log(`Server is up on port ${config.get("server.port")} `)
        })
    }).catch((err) => {
        console.log("error connection to DB Server", err);
        next(err);
    });
} catch (err) {
    console.log("Error in db connection: ", err)
}

//Server Configurations 
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

//middleware
app.use(cors(corsOptions));
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//static files
app.use(express.static(path.join(__dirname, '/public')));
//setting view engin
const viewsDirectoryPath = path.join(__dirname, '/templates/views');
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
//routers 
app.use('/api', Main_Router);
//error handler middleware
app.use(ErrorHandler);



//uncaught exceptions 
process.on('uncaughtException', (ex) => {
    console.log({ status: 505, message: "internal server error", err: "uncaughtException" });
    process.exit(1);
});
//unhandled rejections
process.on('unhandledRejection', (ex) => {
    console.log({ status: 505, message: "internal server error", err: "unhandled rejections" });
    process.exit(1);
});