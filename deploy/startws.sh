#!/bin/sh
cd `dirname $0`

if [ ! -f "pid" ]
then
    node ../daemon.js >../log/chatroom.log 2>../log/chatroom.log &
    echo $! > pid
fi