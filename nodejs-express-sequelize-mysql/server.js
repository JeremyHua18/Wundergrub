const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// calling sync
const db = require("./app/models");

// clear out existing tables. enable for easier testing

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World." });
});

require("./app/routes/users.routes")(app);

require("./app/routes/transactions.routes")(app);
require("./app/routes/harvests.routes")(app);
require("./app/routes/announcements.routes")(app);
require("./app/routes/reports.routes")(app);

require("./app/routes/email.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
