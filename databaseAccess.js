const sqlite3 = require('sqlite3').verbose();
const { open } = require ('sqlite');
// const dataBaseAccess = require('./databaseAccess.js');



class dataBaseAccess {
    constructor(dbPath) {
        this.dbPath = dbPath;
    }
    async writeUserToTable(table, userID) {
        let isInTable = false;
        await this.checkIfUserInTable(table, userID)
            .then((result) => {
                isInTable = result;
            }).catch((err) => {
                console.log(err);
            });
        if (!isInTable) {
            await open({
                filename: this.dbPath,
                driver: sqlite3.Database,
            }).then((db) => {
                try {
                    db.exec(`INSERT INTO ${table} (userID) VALUES (${userID})`);
                }
                catch (err) {
                    console.log(err);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        return !isInTable;

    }
    async checkIfUserInTable(table, userID) {
        let result = false;
        await open({
            filename: this.dbPath,
            driver: sqlite3.Database,
        }).then(async (db) => {
            try {
                result = await db.get(`SELECT * FROM ${table} WHERE userID = ${userID}`);
            }
            catch (err) {
                console.log(err);
            }
        }).catch((err) => {
            console.log(err);
        });
        return result !== undefined;
    }

    async removeUserFromTable(table, userID) {
        let isInTable = false;
        await this.checkIfUserInTable(userID, table)
            .then((result) => {
                isInTable = result;
            }).catch((err) => {
                console.log(err);
            });
        if (isInTable) {

            await open({
                filename: this.dbPath,
                driver: sqlite3.Database,
            }).then((db) => {
                try {
                    db.exec(`DELETE FROM ${table} WHERE userID = ${userID}`);
                } catch (err) {
                    console.log(err);
                }
            }).catch((err) => {
                console.log(err);
            });

        }
    }

    async getAllUserFromTable(table) {
        let result;
        await open({
            filename: this.dbPath,
            driver: sqlite3.Database,
        }).then(async (db) => {
            try {
                result = await db.all(`SELECT * FROM ${table}`);
            } catch (err) {
                console.log(err);
            }
        }).catch((err) => {
            console.log(err);
        });
        return result ??= false;
    }
}





module.exports = dataBaseAccess;
