var express = require('express');
var socket = require('socket.io');
var app = express();
app.set('view engine','ejs');
// app.use('/public',express.static('assets'));


var server = app.listen(4000);

app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection',function(socket){
    
    //event listener
    socket.on('chat',function(data){
        //emiting the data to all sockets connected
        io.sockets.emit('chat',data);
    });
    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});