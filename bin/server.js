#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function(){  
	console.log('Server listening at port %d', port);
});

server.on('listening', function(){
	var addr = server.address();
	var bind = typeof addr === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;
	console.log('Listening on ' + bind);
});


var io = require('socket.io')(server);
var ChatManager = require('../modules/ChatManager.js').ChatManager;
var DbManager = require("../modules/DbManager").DbManager;

io.on('connection', function (socket) {

    // a new chatter log in
    socket.on("login", function (user_info) {
        socket.id = user_info.id; // as the unique id of socket
        socket.name = user_info.name;

        console.log(user_info.name + " enter the room");

        DbManager.getAllHistory(function (err, message_array) {

            socket.emit("all history", message_array);
        });

    });

    /**
     *  When client sends new message, broadcast to all chatter and store it into db.
     */
    socket.on('message', function (data) {
        // broadcast to new message
        console.log("get message" );
        console.log(data)
        var date = getTimeStamp();
        var message_info = {
            user_id: data.userId,
            user_name : data.userName,
            message : data.message,
            date : date
        };
        socket.broadcast.emit('new message', message_info);
        DbManager.addNewMessage(message_info);
    });

    // when the user disconnects
    socket.on('disconnect', function () {
        // remove the username from the chat room
        console.log(socket.name + " leave the room");
        ChatManager.removeChatter(socket.id)
    });

});

/**
 * Return timestamps of now
 */
function getTimeStamp() {
    var date = new Date();
    return date.toUTCString();
}


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}









