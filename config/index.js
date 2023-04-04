require("dotenv").config();

const dev = {
  database: {
    tvshowsUrl: process.env.TVSHOWS_DB,
  },
  app: {
    serverPort: process.env.SERVER_PORT,
  }
}

module.exports = dev;