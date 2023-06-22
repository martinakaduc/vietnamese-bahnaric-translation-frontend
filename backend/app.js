const express = require('express')
var cors = require('cors')
const app = express()
var mysql = require('mysql');
const port = 10013;

app.use(express.json(), cors())

var db_config = {
    host: "bhrmhkdj50mn30jmbwcr-mysql.services.clever-cloud.com",
    user: "uki1mqfkopnus4w7",
    password: "702eic9ofUokluyYgmKm",
    database: "bhrmhkdj50mn30jmbwcr"
};

var con;

function handleDisconnect() {
  con = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

app.post('/auth', (req, res) => {
    let body = req.body;

    con.query("select un, pw from `auth` where un = ? and pw = ?", [body.username, body.password], function(err, data) {
        if (err) res.send("No user found!");
        if (data[0]){
            res.send(data[0].un);
        }
        else res.send("No user found!");
    })
})

app.post('/create', (req, res) => {
    let body = req.body;

    con.query("insert into `auth` value(?, ?)", [body.username, body.password], function(err, data) {
        if (err) res.send("Dupplicated user!");
        else res.send(data[0].un);
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
