require("dotenv").config();

const dev = {
  database: {
    tvshowsUrlLocal: process.env.TVSHOWS_DB,
    tvshowsUrlRemote: process.env.TVSHOWS_REMOTE,
  },
  app: {
    serverPort: process.env.SERVER_PORT,
  }
}

module.exports = dev;