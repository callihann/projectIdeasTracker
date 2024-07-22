var express = require("express");
var router = express.Router();
var client = require("../database/client");

const database = client.db("ideas");
const users = database.collection("users");
const ideaCollection = database.collection("idea");

/* GET home page. */
router.get("/", async function (req, res, next) {
	if (req.cookies.token && (await users.findOne({ token: req.cookies.token }))) {
		const results = await ideaCollection.find().toArray();
		res.render("index", { ideas: results });
	} else {
		res.redirect("/auth/login");
	}
});

module.exports = router;
