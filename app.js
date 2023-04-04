const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const tvshowsRouter = require("./routes/tvshows");
const dev = require("./config");
const connectDB = require("./config/database");

const app = express();
const port = dev.app.serverPort;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.json(urlencoded({ extended: true })));

app.use(tvshowsRouter);

app.listen(port, () => {
  console.log(`Server is alive on port ${port}`);
  connectDB();
});
