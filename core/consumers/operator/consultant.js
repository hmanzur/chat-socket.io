module.exports = (io) => {
    io.to('/consultant').on('connection', (socket) => {
        io.sockets.connected[socket.id].emit('consultant success', socket.id);

        socket.on('disconnect', (reason) => {
            if (socket.id in io.sockets.connected) {
                io.sockets.connected[socket.id].emit('disconnect', reason);
            }
        });
    });
};
