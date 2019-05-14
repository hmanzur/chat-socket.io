const redis = require('redis'),
    client = redis.createClient(process.env.CACHE_PORT || 6379, process.env.CACHE_HOST);

client.on('error', function (err) {
    console.log('Redis error: ', err)
});


module.exports.cache = {
    client: client,
    set: (key, val) => {
        client.set(key, val, redis.print);
    },
    get: async (key, defaultValue) => {
        return await client.get(key) || defaultValue;
    }
};
