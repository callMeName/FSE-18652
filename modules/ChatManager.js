/**
 * Created by xuyuhao on 16/8/28.
 */

var dbManager = require("../modules/DbManager.js").DbManager;

/*
** A js singleton class.
** Manage all operations of the chat room.
 */
var ChatManager = {
    user_count : 0,
    user_list : {},

    /*
    **  If Its a new user, register he/she, then connect to the chat socket.
     */
    login: function (username, callback) {
        console.log("user:" + username + " login");

        dbManager.getUserInfoByName(username, function (err, user_info) {

            if(err) callback(err);

            else {

                if (user_info == undefined || user_info == null || user_info == false) {
                    console.log(username + " doesnt exist, add him/her.");
                    dbManager.addUser(username, function (err) {

                        dbManager.getUserInfoByName(username, function (err, user_info) {
                            if (err) callback(err);
                            else {
                                // NOTE: block the db to make sure insert SQL query saved.
                                if (ChatManager.isChatterExist(user_info)) {
                                    err = "User " + username + " has logged in!";
                                    console.log(err);
                                    callback(err);
                                }
                                ChatManager.addChatter(user_info);
                                callback(err, user_info, ChatManager.user_count, ChatManager.user_list);

                            }
                        });
                    });
                }
                else {
                    if(ChatManager.isChatterExist(user_info)) {
                        err = "User " + username + " has logged in!";
                        console.log(err);
                        callback(err)
                    }
                    ChatManager.addChatter(user_info);
                    callback(err, user_info, ChatManager.user_count, ChatManager.user_list);
                }

            }

        });

    },

    isChatterExist : function (user_info) {
        if(!user_info) return false;
        else {
            if(this.user_list.hasOwnProperty(user_info.id)) {

                return false;

            }
        }
    },

    addChatter: function(user) {
        console.log("add chatter:");
        console.log(user);
        this.user_list[user.id] = user.name;
        this.user_count ++;
    },

    removeChatter : function (user_id) {
        delete this.user_list[user_id];
        this.user_count --;
    },

    /*
    ** Unit test
     */
    test: function () {
        dbManager.test();
    }


};




exports.ChatManager = ChatManager;