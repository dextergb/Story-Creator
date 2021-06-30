const express = require("express");
const router = express.Router();
const db = require("../db/database");
const { response } = require("express");
module.exports = () => {
  router.get("/", (req, res) => {
    const userId = req.session["user_id"];
    const userEmail = req.session.email;
    const templateVars = {
      stories: response.rows,
      userID: req.session.user_id,
    };

    if (!userId) {
      // if user is not logged , he will be redirected to the main page again
      return res.redirect("/login");
    }
    if (authenticationOfUsers(userEmail, db) === true) {
      return res.render("stories_new.ejs", templateVars);
    }
  });

  router.post("/", (req, res) => {
    const body = req.body;

    db.query(
      `INSET INTO stories (user_id, story_body, user_name) VALUES ($1,$2,$3)`,
      [body.user_id, body.story_body, body.user_name]
    );
  });

  return router;
};
