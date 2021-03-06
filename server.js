// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
// PG database client/connection setup

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Mount all resource routes
const usersRoutes = require("./routes/users");
const loginRoute = require("./routes/login");
const createRoute = require("./routes/new-story");
const collaborationRoute = require("./routes/accept-collab");
const storiesRoute = require("./routes/stories");
const indexRoute = require("./routes/index");
const userRegister = require("./routes/register");
const voteButtonRoute = require("./routes/vote_button");
const logoutRoute = require("./routes/logout");

// Mount usage of resource routes
app.use("/users", usersRoutes());
app.use("/login", loginRoute());
app.use("/create", createRoute());
app.use("/stories", storiesRoute());
app.use("/", indexRoute());
app.use("/register", userRegister());
app.use("/vote_button", voteButtonRoute());
app.use("/logout", logoutRoute());
app.use("/collaborations", collaborationRoute());
// Note: mount other resources here, using the same pattern above

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
