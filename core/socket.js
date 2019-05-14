const User = require("./models/user");
const chat = require("./consumers/chat");
const agent = require("./consumers/operator/agent");
const consultant = require("./consumers/operator/consultant");
const supervisor = require("./consumers/operator/supervisor");

module.exports.initConsumers = (server) =>{
    const io = require('socket.io')(server, {
        path: '/ws',
        serveClient: false,
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });

    const jwtAuth = require('socketio-jwt-auth');

    io.use(jwtAuth.authenticate({
        secret: process.env.SECRET_KEY,
        succeedWithoutToken: false
    }, function (payload, done) {
        console.debug('jwtAuth.authenticate', payload);
        if (payload) {
            User.get(payload['user_id']).then((user) => {
                return done(null, user);
            });
        } else {
            return done()
        }
    }));

    chat(io);
    agent(io);
    consultant(io);
    supervisor(io);
};
