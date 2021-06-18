const mongos = require('mongoose');
class DB {

    constructor(config) {
        this.connected = false;
        if (!config) throw ("not valid database configurations");
        if (!config.get('Users.dbConfig.DBConnectionString')) { console.log("not exist"); throw ("please set the env-variables first"); }

        this.connect = async function() {
            await mongos.connect(config.get('Users.dbConfig.DBConnectionString'), { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
                console.log(`in DB obj `, res);
                this.connected = res.connections[0].readyState === 1;
                return;
            }).catch((err) => {
                console.log(`Error connection to  database `, err);
            });

        }
    }



}

module.exports = DB;