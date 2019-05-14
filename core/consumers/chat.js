module.exports = (io) =>{
    io.to('/chat').on('connection', (socket) => {
        console.log('Welcome', socket.request.user.username, socket.id);

        const room = 'chat-2';

        socket.room = room;

        socket.join(room);

        io.sockets.connected[socket.id].emit('success', {
            id: socket.id,
            room: room,
            user: socket.request.user.toJson()
        });

        socket.on('message', (message) => {
            console.log('on message', message);

            const body = {
                id: socket.id,
                message: message
            };

            io.emit('message', body);
        });

        socket.on('typing', (user) => {
            console.log('on typing', user);
            io.emit('typing', user);
        });

        socket.on('finish', (user) => {
            io.emit('finish', user);
        });

        socket.on('rate', (score) => {
            io.emit('rate', score);
        });

        socket.on('typification', (id) => {
            io.emit('typification', id);
        });

        socket.on('exit', () => {
            io.close();
        });

        socket.on('disconnect', (reason) => {
            if (socket.id in io.sockets.connected) {
                io.sockets.connected[socket.id].emit('disconnect', reason);
            }
            socket.leave(room);
        });
    });
};
