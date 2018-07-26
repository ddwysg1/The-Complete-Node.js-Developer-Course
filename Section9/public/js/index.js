var socket = io();
socket.on('connect', function(){
    console.log('Connected to server');
    
    socket.emit('createMessage', {
        from: 'jack@example.com',
        text: 'Hey there'
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage) {
    console.log('New message', newMessage);
})
