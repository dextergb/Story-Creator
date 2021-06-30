const express = require("express");
const router = express.Router();
const db = require("../db/database");
const { response } = require("express");
const authenticationOfUsers = require("./helper_functions/helper_functions");

module.exports = () => {
  router.get("/", (req, res) => {
    const templateVars = {
      stories: response.rows,
      userID: req.session.user_id,
    };
    res.render("register.ejs", templateVars);
  });

  router.post("/", async (req, res) => {
    const email = req.body.email;
    const fullName = req.body.full_name;
    const userCheck = await authenticationOfUsers(email, db);
    if (email === "" || fullName === "") {
      return res.status(400).send({
        message: "Error: You need an Email and Full Name to Register",
      });
    }
    if (userCheck) {
      return res.status(400).redirect("/register?error=Userinuse");
    }
    const body = req.body;
    db.query(
      `INSERT INTO users (full_name, email, nick_name)
      VALUES ($1,$2,$3) RETURNING *`,
      [body.full_name, body.email, body.nick_name]
<<<<<<< HEAD
    ).then((data) => {
      const newUser = data.rows[0];
      req.session["user_id"] = newUser.id;
      res.redirect("/");
    });
=======
    )
      .then((data) => {
        // console.log(" ++++++++ ", data.rows);
        const newUser = data.rows[0];
        console.log("This is a new user:", newUser);

        req.session["user_id"] = newUser.id;
        res.redirect("/");
      })
      .catch(function (e) {
        console.error(e); // "oh, no!"
        console.log("message: ", e);
      });
>>>>>>> master

    //res.cookie('user_id', userId);
  });
  return router;
};
