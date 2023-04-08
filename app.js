const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const dev = require("./config");
const connectDB = require("./config/database");

const tvshowsRouter = require("./routes/tvshows");
const appRouter = require("./routes/appController");


const app = express();
const port = dev.app.serverPort;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.json(urlencoded({ extended: true })));

app.use(tvshowsRouter);
app.use(appRouter);

app.listen(port, () => {
  console.log(`Server is alive on port ${port}`);
  connectDB();
});
