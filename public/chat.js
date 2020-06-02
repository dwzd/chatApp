//实现和服务端的连接
let socket = io.connect('http://localhost:779');

let message = document.getElementById('message');
    handle = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

    //1.事件监听 客户端向服务器传输数据
btn.addEventListener('click', ()=>{
   socket.emit('chatEvent', {
       message: message.value,
       handle: handle.value
   });
   message.value = '';
});

message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value);
});

//3.获取从服务器传来的数据,以显示到页面中
socket.on('chatEvent', (data)=>{
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}: ${data.message}</strong></p>`
});

socket.on('typing', (data)=>{
   feedback.innerHTML = `<p><em>${data} is inputting...</em></p>`
});