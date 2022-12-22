const express = require('express')
var cors = require('cors')
const app = express()
var mysql = require('mysql');
const port = 5000;

app.use(express.json(), cors())

var con = mysql.createConnection({
    host: "bhrmhkdj50mn30jmbwcr-mysql.services.clever-cloud.com",
    user: "uki1mqfkopnus4w7",
    password: "702eic9ofUokluyYgmKm",
    database: "bhrmhkdj50mn30jmbwcr"
  });

con.connect(function(err) {
    if (err) throw err;
});

app.post('/auth', (req, res) => {
    let body = req.body;

    con.query("select un, pw from auth where un = ? and pw = ?", [body.username, body.password], function(err, data) {
        if (err) throw err;
        if (data[0]){
            res.send(data[0].un);
        }
        else res.send("No user found!");
    })
})

app.post('/history', (req, res) => {
    let username = req.body.username;
    
    con.query("select input, output from `history` where un = ?", username, function(err,data) {
        if (err) throw err;
        if (!data[0]){
            res.send("No translation found!");
        }
        else res.send(data);
    })
})

app.post('/saveHistory', (req, res) => {
    let body = req.body;

    con.query("insert into `history` value(?, ?, ?)", [body.username, body.input, body.output], function(err, data) {
        if (err) throw err;
        res.send("success");
    })
})

app.listen(port, () => console.log(`Your project is running at http://localhost:${port}`))