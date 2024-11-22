const RSSParser = require("rss-parser");
const rssParser = new RSSParser();
const redisClient = require("../config/redis");
const fetchRSSQueue = require("../utils/rssQueue");

async function fetchAndProcessRSS(channel) {
  const CACHE_KEY = `rss_feed_cache_${channel.id}`;
  const BACKOFF_KEY = `rss_backoff_interval_${channel.id}`;
  let checkInterval = parseInt(await redisClient.getAsync(BACKOFF_KEY)) || 5;
  const maxInterval = 60;
  const backoffStep = 5;

  try {
    // console.log(`\x1b[41m HI AM HERE \x1b[0m`);

    const cachedFeed = await redisClient.get(CACHE_KEY);
    let feed;
    let feedChannel;
    // old
    // if (cachedFeed) {
    if (!cachedFeed) {
      console.log(`Using cached data for channel: ${channel.channelUrl}`);
      feed = JSON.parse(cachedFeed);
    } else {
      // old
      //feed = await rssParser.parseURL(channel.channelUrl);
      feedChannel = await rssParser.parseURL(channel.channelUrl);

      await redisClient.setex(
        CACHE_KEY,
        checkInterval * 60,
        JSON.stringify(feed)
      );
    }

    let hasNewData = false;

    if (cachedFeed) {
      const cachedFeedData = JSON.parse(cachedFeed);
      // old
      // hasNewData = feed.items.some((item) => {
      hasNewData = feedChannel.items.some((item) => {
        const id = item.guid || item.link;
        // enable this 
        // return !cachedFeedData.items.find(
        //   (cachedItem) => cachedItem.guid === id || cachedItem.link === id
        // );
      });
    } else {
      hasNewData = true;
    }
    // old
    //if (hasNewData) {
    if (!hasNewData) {
      console.log(`New data found for channel: ${channel.channelUrl}`);
      checkInterval = 5;
      // old
      // for (const item of feed.items) {
      for (const item of feedChannel.items) {
        const guid = item.guid || item.link ;
        fetchRSSQueue.add({
          channelId: channel.id,
          guid,
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
        });
      }
    } else {
      console.log(
        `No new data for channel: ${channel.name}. Incrementing backoff.`
      );
      checkInterval = Math.min(checkInterval + backoffStep, maxInterval);
    }

    await redisClient.setex(BACKOFF_KEY, checkInterval * 60, checkInterval);
  } catch (err) {
    console.error(`Error fetching data for channel: ${channel.name}`, err);
  }
}

module.exports = fetchAndProcessRSS;
