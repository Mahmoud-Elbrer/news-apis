const redis = require('redis');
const { promisify } = require('util');


const URL = process.env.ROUTES_URL;
const PORT = process.env.PORT || 8000;

const redisClient = redis.createClient({
  url: "redis://localhost:6379"
//  host: "redis://localhost",
 // port: 6379,
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});


redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
redisClient.setAsync = promisify(redisClient.set).bind(redisClient);

module.exports = redisClient;
