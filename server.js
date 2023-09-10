var express = require('express');
var os = require('os');
var app = express();

app.get('/server_ip', (req, res)=>{
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    res.send(addresses)
})

app.get('/name', (req,res)=>{
    res.send('Methasit Tantiplubtong')
})

app.get('/time', (req,res)=>{
    const dateObject = new Date();
    res.send(dateObject.toTimeString().slice(0,8))
})

var server = app.listen(8080, (req,res)=>{
    console.log(server.address().port)
})