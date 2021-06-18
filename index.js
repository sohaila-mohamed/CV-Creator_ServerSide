const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const config = require('config');
const app = express();
const DB = require('./database/DatabaseConnection');
const Main_Router = require('./routers/MainRouter')
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
//routers 
app.use('/api', Main_Router);