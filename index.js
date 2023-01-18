// Node will handle socket io connections

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname + '/public'));

const users = {};

io.on('connection', socket => {

    //socket will listen to particular events
    //when a new user joins the chat, inform others, add to users list
    socket.on('new-user-joined', userName => {
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
        io.emit('count', socket.client.conn.server.clientsCount);

    });
    // when someone sends message show it to other users
    socket.on('sendMsg', message1 => {
        socket.broadcast.emit('receive', { message: message1, name: users[socket.id] });
    });

    // when someone gets diconnected
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        io.emit('count', socket.client.conn.server.clientsCount);
    });

});


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});