var express = require('express');
var os = require('os');
var app = express();
var http = require('http');
var https = require('https');
var fs = require('fs');
var fetch = require('cross-fetch');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/aikonnn.canadacentral.cloudapp.azure.com/privkey.pem','utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/aikonnn.canadacentral.cloudapp.azure.com/cert.pem','utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/aikonnn.canadacentral.cloudapp.azure.com/chain.pem','utf8');

const credentials = {
	key:privateKey,
	cert:certificate,
	ca:ca
};

app.get('/server_ip', (req, res)=>{
    res.send('20.200.122.128')
})

app.get('/name', (req,res)=>{
    res.send('Methasit Tantiplubtong')
})

app.get('/time', (req,res)=>{
    const dateObject = new Date();
    res.send(dateObject.toTimeString().slice(0,8))
})

app.get('/arts', async (req, res) => {
    const store = await(await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')).json();
    const availableIds = store.objectIDs;
	
    
    var img = "";
    var title = "";
    while(img === ""){
        var item_id = availableIds[Math.floor(Math.random()*availableIds.length)];
        const object = await(await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + item_id)).json();
        img = object.primaryImageSmall;
        title = object.title;
    }
    res.send({
        img: img,
        name: title
    })
})

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials,app);

httpsServer.listen(443, (req,res)=>{
    console.log('https 443')
});

httpServer.listen(80, () => {
    console.log("http server online on 80");
});
