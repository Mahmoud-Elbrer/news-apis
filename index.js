const express = require("express");
const app = express();
require("dotenv").config();
const news = require("./routes/news");
const users = require("./routes/users");
const categories = require("./routes/categories");
const typeCategories = require("./routes/typeCategories");
const channelsRoutes = require("./routes/channels");
const commentsRoutes = require("./routes/comments");
const httpStatus = require("./utils/httpStatus");
const fileEasyUpload = require("express-easy-fileuploader");
require("./utils/swagger")(app);
// Here rss configuration
const cron = require('node-cron');
const fetchAndProcessRSS = require('./services/rssService');
const fetchAndSaveRSS = require('./services/rssService2');
const { models } = require("./database/connection");
const { channels } = models;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  fileEasyUpload({
    app,
    fileUploadOptions: {
      limits: { fileSize: 50 * 1024 * 1024 },
    },
  })
);

const URL = process.env.ROUTES_URL;

app.use(`${URL}/news`, news);
app.use(`${URL}/users`, users);
app.use(`${URL}/categories`, categories);
app.use(`${URL}/type-categories`, typeCategories);
app.use(`${URL}/channels`, channelsRoutes);
app.use(`${URL}/comments`, commentsRoutes);

app.use(express.static("."));
// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatus.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});





const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`app running at ${PORT}`);
});

// call scheduleRSSJobs to get news 
scheduleRSSJobs();

// here schedule RSS function to get news 
async function scheduleRSSJobs() {
  const data = await channels.findAll({ where: { enable: true } });

  data.forEach((channel) => {
    cron.schedule(`*/${6} * * * * *`, () => {
      fetchAndProcessRSS(channel);
     // fetchAndSaveRSS(channel);
    });
  }); 
  console.log('Scheduled RSS jobs for all enabled channels.');
}

module.exports.scheduleRSSJobs = scheduleRSSJobs;

require('./controllers/rssJob');
