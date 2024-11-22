const fetchRSSQueue = require("../utils/rssQueue");
const { models } = require("../database/connection");
const { news } = models;

fetchRSSQueue.process(async (job) => {
  const { channelId, guid, title, link, pubDate } = job.data;

  try {
    const founded = await news.findOne({
      where: {
        link: guid,
      },
    });

    if (founded) {
      console.log(`Entry already exists for channel ID ${channelId}: ${guid}`);
    } else {
      console.log(`New entry added for channel ID ${channelId}: ${guid}`);
      const created = await news.create({
        title: title,
        link: link,
        pubDate: new Date(pubDate),
        channelId: channelId,
        content: " item.summary",
      });

      if (created) {
        console.log(`Created: ${item.title}`);
      } else {
        console.log(`Not Created:: ${item.title}`);
      }
    }
  } catch (error) {
    console.error("Error processing RSS entry:", error);
  }
});
