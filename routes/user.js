var express = require("express");
var router = express.Router();
var client = require("../database/client");

const database = client.db("ideas");
const users = database.collection("users");

/* GET home page. */
router.get("/:username", async function (req, res, next) {
	if (req.cookies.token) {
		console.log("Token:", req.cookies.token);
		await users.findOne({ token: req.cookies.token });
		res.render("index", { title: "Express" });
	} else {
		res.redirect("/auth/login");
	}
});

module.exports = router;
