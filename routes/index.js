var express = require('express');

var router = express.Router();
var chatManager = require("../modules/ChatManager.js").ChatManager;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'FSE Chat Room' });
});

router.get('/login', function (req, res, next) {
    // console.log(req.query.username);
    if(!req.query.username) res.redirect("/");

    chatManager.login(req.query.username, function (err, user_info, user_count, user_list) {
        if(err)res.redirect('/');
        else
            res.redirect("/chatRoom?id="+ user_info.id + "&name=" + user_info.name + "&user_count=" + user_count);
    });


});

router.get("/test", function () {
    chatManager.test();
});

router.get('/chatRoom', function (req, res, next) {

    res.render('chatRoom', {name: req.query.name, id: req.query.id, user_count: req.query.user_count});
});


module.exports = router;
