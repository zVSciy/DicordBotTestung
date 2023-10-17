const sqlite3 = require('sqlite3').verbose();
const { open } = require ('sqlite');



class dataBaseAccess {
    constructor(dbPath) {
        this.dbPath = dbPath;
    }
    async writeUserToTable(userID, table) {
        this.checkIfUserInTable(userID, table)
            .then((result) => {
                if (result) {
                    return;
                }
            }).catch((err) => {
                console.log(err);
            });

        await open({
            filename: this.dbPath,
            driver: sqlite3.Database,
        }).then((db) => {
            db.exec(`INSERT INTO ${table} (userID) VALUES (${userID})`);
        }).catch((err) => {
            console.log(err);
        });
    }
    async checkIfUserInTable(userID, table) {
        let result = false;
        await open({
            filename: this.dbPath,
            driver: sqlite3.Database,
        }).then(async (db) => {
            result = await db.get(`SELECT * FROM ${table} WHERE userID = ${userID}`);
        }).catch((err) => {
            console.log(err);
        });
        return result !== undefined;
    }
}





module.exports = dataBaseAccess;
