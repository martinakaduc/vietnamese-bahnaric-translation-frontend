
    con.query("select un, pw from auth where un = ? and pw = ?", [body.username, body.password], function(err, dat