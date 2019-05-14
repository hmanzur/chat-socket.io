module.exports = (io) => {
    io.to('/supervisor').on('connection', (socket) => {
        io.sockets.connected[socket.id].emit('supervisor success', socket.id);

        socket.on('disconnect', (reason) => {
            if (socket.id in io.sockets.connected) {
                io.sockets.connected[socket.id].emit('disconnect', reason);
            }
        });
    });
};
