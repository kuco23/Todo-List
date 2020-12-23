const sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DB_SOURCE = "note.db"
const SQL_CREATE_NOTE_TABLE = `
    CREATE TABLE IF NOT EXISTS note (
        id INTEGER PRIMARY KEY,
        userId INTEGER NOT NULL,
        content TEXT NOT NULL,
        expirationDate TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )`
const SQL_INSERT_NOTE_ROW = `
    INSERT INTO note (id,userId,content,expirationDate,timestamp)
    VALUES (?,?,?,?,?)
`

let db = new sqlite3.Database(`./${DB_SOURCE}`, (err) => {
    if (err) return console.log("Failed to open database")
    console.log("Connected to database");
})

/*
db.run(SQL_CREATE_NOTE_TABLE, (err) => {
    if (err) return console.log("Failed to create table note")
    let rows = [
        [0, 0, 'Hi!', '20.20.2020', '19.20.2020'],
        [1, 0, 'Bi!', '20.20.2020', '19.20.2020']
    ]
    for (let row of rows) db.run(SQL_INSERT_NOTE_ROW,row)
})
*/

module.exports = {
    SQL_INSERT_NOTE_ROW, db
}