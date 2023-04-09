const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const dev = require("./config");
const connectDB = require("./config/database");

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const tvshowsRouter = require("./routes/tvshows");
const appRouter = require("./routes/appRoutes");

const app = express();
const port = dev.app.serverPort;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TV-shows API",
      description: "Contains a list of TV-shows",
      version: "1.0.0",
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ["./controllers/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

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
