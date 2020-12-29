import { Database } from "sqlite3";

const DB_SOURCE = "note.db";

const SQL_CREATE_NOTE_TABLE: string = `
    CREATE TABLE IF NOT EXISTS note (
        id INTEGER PRIMARY KEY,
        userId INTEGER NOT NULL,
        content TEXT NOT NULL,
        expirationDate TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )`;
const SQL_QUERY_NOTES: string = `SELECT * FROM note`;
const SQL_INSERT_NOTE_ROW: string = `
    INSERT INTO note (id,userId,content,expirationDate,timestamp)
    VALUES (?,?,?,?,?)
`;
const SQL_UPDATE_NOTE_CONTENT = `
  UPDATE note SET content=?,timestamp=? WHERE id=?
`;

const db = new Database(`./${DB_SOURCE}`, (err:any) => {
  if (err) return console.log("Failed to open database");
  console.log("Connected to database");
})

/*
db.run(SQL_CREATE_NOTE_TABLE, (err:any) => {
  if (err) return console.log("Failed to create table note")
  let rows = [
      [0, 0, 'Hi!', '20.20.2020', '19.20.2020'],
      [1, 0, 'Bi!', '20.20.2020', '19.20.2020']
  ]
  for (let row of rows) db.run(SQL_INSERT_NOTE_ROW,row)
})
*/

export {
  db, SQL_CREATE_NOTE_TABLE, SQL_INSERT_NOTE_ROW,
  SQL_QUERY_NOTES, SQL_UPDATE_NOTE_CONTENT
}
