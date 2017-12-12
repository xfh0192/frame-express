const express = require('express')
const app = express()

app.use('/api', require('./router/api'))

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('node success')
})