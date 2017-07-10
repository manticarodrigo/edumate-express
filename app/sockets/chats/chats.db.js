var config = require('../config');
var mongojs = require('mongojs');
var chatsDB = mongojs(config.mongoDB.host, ['chats']);
var membersDB = mongojs(config.mongoDB.host, ['members']);
var messagesDB = mongojs(config.mongoDB.host, ['messages']);
 
var chats = {
 
    fetchChatsFor: function(user, callback) {
        db.members.find({"users": ObjectId(user.id)}, function (value, index, obj) {
            // TODO: Iterate over chats to which user belongs and fetch chat meta
        });
    },
    chatWith: function(user, callback) {
        // TODO: Create separate participants table
        const chat = 
        db.chats.insert(user, callback);
        
    },
    updateChat: function(chat, callback) {
        db.chat.update({
            id: chat.id
        }, chat, {}, callback);
    },
    deleteChat: function(chat, callback) {
        db.users.remove({
            id: chat.id
        }, '', callback);
    }
}
 
module.exports = chats;