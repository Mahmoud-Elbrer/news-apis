const RSSParser = require("rss-parser");
const rssParser = new RSSParser();
const { models } = require("../database/connection");
const { news } = models;

async function fetchAndSaveRSS(channel) {
  try {
    // Fetch the RSS feed
    const feed = await rssParser.parseURL(channel.channelUrl);

    for (const item of feed.items) {
      const linkOrGuid =  item.link || item.guid ;
      const oldNews = await news.findOne({
        where: {
          link: linkOrGuid,
        },
      });

      if (oldNews) {
        console.log("News already Exists : "+ linkOrGuid);
      } else {
        const created = await news.create({
          title: item.title,
          link: item.link,
          pubDate: new Date(item.pubDate),
          channelId: channel.id,
          content: item.content || item.description || 'no-content',
          contentSnippet : item.author || "no-author" 
        });

        if (created) {
          console.log(`New entry added: ${item.link}`);
        } else {
          console.log(`Entry already exists: ${item.link}`);
        }
      }
    }
  } catch (err) {
    console.error("Error fetching or saving RSS feed:", err);
  }
}
module.exports = fetchAndSaveRSS;
