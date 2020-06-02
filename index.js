
const express = require('express');
const socket = require('socket.io');

//实例化express 对象
const app = express();


let server = app.listen(779, ()=>console.log('The chat server is running on port 779 端口'));

//识别静态文件
app.use(express.static('public'));

//设置 socket.io
let io = socket(server);
io.on('connection', (socket)=>{
    console.log('socket 在服务端连接', socket.id);

    //2.获取从客户端发送来的数据 chatEvent 事件
    socket.on('chatEvent', (data)=>{
        io.sockets.emit('chatEvent', data);
    })

    //4.获取从客户端发送来的数据 typing 事件
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    })

});

