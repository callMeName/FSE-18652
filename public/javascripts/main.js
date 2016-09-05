/**
 * Created by xuyuhao on 16/9/4.
 */



$(function(){
    var socket = io('http://localhost:3000');
    var userId = $('#user_id').val();
    var userName = $('#user_name').val();
    var $inputMessage = $('#inputMessage');
    var ENTER_CODE = 13;
    socket.emit("login", {id:userId, name:userName});

    socket.on('all history', function (message_array) {
        // show all history chat messages
        console.log(message_array);
        for (var i in message_array) {
            addNewMessage(message_array[i]);
        }
    });

    socket.on('new message', function (newMessage) {
        // show message
        console.log(newMessage);
        addNewMessage(newMessage);
    });


    // Keyboard events
    $(window).keydown(function (event) {
        // When the client hits ENTER on their keyboard
        if (event.which === ENTER_CODE) {
            // send the chat message to server
            var message = $inputMessage.val();
            if(message != '' && message != undefined && message !=null) {
                socket.emit('message', {userId: userId, userName: userName, message: message});
            }
            $inputMessage.val("");

        }
    });




    // Focus input when clicking on the message input's border
    $inputMessage.click(function () {
        $inputMessage.focus();
    });

    // show a new message to the list
    function addNewMessage(message_info) {

        // if it is the client himself
        if(userId == message_info.user_id) {
            var $usernameDiv = $('<strong class="primary-font">')
                .text(message_info.user_name)
                .css("color", "red");

        }
        else {
            var $usernameDiv = $('<strong class="primary-font">')
                .text(message_info.user_name)
                .css("color", "blue");

        }

        var $dateDiv = $('<span class="glyphicon glyphicon-time">')
            .text(message_info.date)
            .css("color", "grey");

        var $smallDate = $('<small class="pull-right text-muted">')
            .append($dateDiv);

        var $header = $('<div class="header">')
            .append( $usernameDiv, $smallDate);


        var $messageBodyDiv = $('<p>')
        .text(message_info.message);

        var $chatBody = $('<div class="chat-body clearfix">')
        .append($header,$messageBodyDiv);

        var $chat = $('<li class="left clearfix">')
            .append($chatBody);

        var $messages = $('#messages')
        $messages.append($chat);
        $messages[0].scrollTop = $messages[0].scrollHeight;

    }


}
);



