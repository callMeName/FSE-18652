/**
 * Created by xuyuhao on 16/8/28.
 */

var db = require("../config/dbConfig.js");


var DbManager = {

    login : function (username) {

    },

    getUserInfoByName : function (username, callback) {
        db.get("SELECT * FROM user_info WHERE name = ?",username, function (err, row) {
            if (err) {
                console.log(err)
            }
            console.log("DB: get user info:");
            console.log(row);
            callback(err, row);
        });
    },

    addNewMessage: function (message_info) {
        db.run("INSERT INTO messages(user_id,user_name,message,date) VALUES (?,?,?,?)",
            [message_info.user_id, message_info.user_name, message_info.message, message_info.date],function(err){
            if(err)
                console.log(err);
        });
    },

    test : function(){
       console.log("test");
        var a= "adsfdsafs";
        db.run("insert into user_info(name) values (?)",a, function (err) {
            console.log("test done");
        });
    },

    addUser : function (username, callback) {
        console.log("add user " + username);


        db.run("insert into user_info(name) values (?)", username,function (err) {
            console.log("added done");
            if(err) {
                console.log(err);
            }
            else {
                callback();
            }

        });

    },

    getAllHistory : function (callback) {
        db.all("SELECT * FROM messages", [], function (err, rows) {
            if(err) {
                console.log(err);
            }
            callback(err, rows);



        })
    },

};


exports.DbManager = DbManager;

