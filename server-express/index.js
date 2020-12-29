const random = require('random');
const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors')
const dbmodule = require('./database');

const HTTP_PORT = 3000
const randomKey = () => random.int(min = 0, max = 1000000)
const getTimestamp = () => "20.20.2020"

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(bodyparser.json())

app.get("/note", (req, res, next) => {
    dbmodule.db.all("SELECT * FROM note", (err, notes) => {
        if (err) return console.log("coudnt get")
        res.json(notes)
    })
})

app.post('/note/new', (req, res, next) => {
    let data = req.body
    let date = getTimestamp()
    let key = randomKey()
    dbmodule.db.run(
        dbmodule.SQL_INSERT_NOTE_ROW, [
            key, data.userId, data.content,
            data.expirationDate, date
        ]
    )
    data.noteId = key
    data.timestamp = date
    res.json(data)
})

app.post('/note/update', (req, res, next) => {
    let data = req.body
    let date = getTimestamp()
    dbmodule.db.run(
        `UPDATE note SET content=?, timestamp=? WHERE id=?`,
        [data.content, date, data.id]
    )
    res.send(true)
})

app.delete('/note/:id/delete', (req, res, next) => {
    let id = req.params.id
    dbmodule.db.run(`DELETE FROM note WHERE id=${id}`)
    res.send(true)
})

app.use((req,res) => {console.log('404')})

app.listen(HTTP_PORT, () => `listening on port ${HTTP_PORT}`)
