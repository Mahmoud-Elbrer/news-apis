const Bull = require('bull');

const URL = process.env.ROUTES_URL;
const PORT = process.env.PORT || 8000;

const fetchRSSQueue = new Bull('fetch-rss', {
  url: "redis://localhost:6379"
});

module.exports = fetchRSSQueue;
