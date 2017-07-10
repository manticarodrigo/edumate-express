var chatsDB = require('./chats.db');
module.exports = function(io) {
 
    var chats = io.of('/chats');
 
    chats.on('connection', function(socket) {
 
        socket.on('fetchChatsFor', function(user) {
            console.log("Fetching chats for : " + user.id);
            chatsDB.fetchChatsFor(user, function (err, data) {
                if (err) throw err; // You can emit the error to a socket 
                io.of('/chats').emit('fetchChatsFor', data);
            });
        });
 
        socket.on('chatWith', function(user) {
            console.log("Chatting with : " + user.id);
            chatDB.chatWith(user, function (err, data) {
                if (err) throw err; // You can emit the error to a socket 
                io.of('/chats').emit('chatWith', data);
            });
        });
 
        socket.on('updateChat', function(chat) {
            chatsDB.updateChat(chat, function (err, data) {
                if (err) throw err; // You can emit the error to a socket 
                io.of('/chats').emit('updateChat', data);
            });
        });
        
        socket.on('deleteChat', function(chat) {
            chatsDB.deleteChat(chat, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                io.of('/chats').emit('deleteChat', data);
            });
        });

    });
 
    return chats;
}