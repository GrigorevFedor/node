const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

// const { MongoClient } = require("mongodb");

// const uri =
//     "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

// const client = new MongoClient(uri);
// async function run() {
//     try {
//         await client.connect();
//         await client.db("admin").command({ ping: 1 });
//         console.log("Connected successfully to server");
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);


const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }));

const usersList = [];

function getAlphaNumericRandom(len) {
    if ((len == undefined) || (len <= 0)) { len = 1; }
    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    var iffirst = 0;
    for (var i = 0; i < len; i++) {
        if (i == 0) { iffirst = 10; } else { iffirst = 0; }
        result += characters[Math.round(Math.random() * (characters.length - iffirst - 1))];
    }
    return result;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createNewUser(id) {
    return {
        id: id,
        name: getAlphaNumericRandom(5),
        color: getRandomColor(),
    }
}

const io = socket(server);
io.on('connection', client => {
    console.log('client - connect', client.id);
    usersList.push(createNewUser(client.id))
    client.broadcast.emit('server-connect', usersList.find(el => el.id == client.id)?.name);
    client.broadcast.emit('refresh', usersList.length);

    client.on('client-msg', data => {
        const payload = {
            message: data.message,
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });

    client.on('reconnect', function () {
        console.log('client - reconnect', usersList.find(el => el.id == client.id)?.name);
        client.broadcast.emit('refresh', usersList.length);
    });

    client.on('disconnect', function () {
        console.log('client - disconnect', client.id);
        client.broadcast.emit('server-disconnect', usersList.find(el => el.id == client.id)?.name);
        client.broadcast.emit('refresh', usersList.length);
    });

});

server.listen(5555);
