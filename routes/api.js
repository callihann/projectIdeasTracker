var express = require("express");
var router = express.Router();
var client = require("../database/client");

const database = client.db("ideas");
const users = database.collection("users");
const ideaCollection = database.collection("idea");

/* GET home page. */
router.get("/", async function (req, res, next) {
	res.sendStatus(200);
});

router.post("/submit", async function (req, res, next) {
	const { title, description } = req.body;
	const query = { title: title, description: description };
	if (!req.cookies.token) {
		res.sendStatus(401);
		return;
	} else if (!(await users.findOne({ token: req.cookies.token }))) {
		res.sendStatus(401);
		return;
	} else if (!req.body.title || !req.body.description) {
		res.sendStatus(400);
		return;
	} else if (req.body.title.length > 100 || req.body.description.length > 500) {
		res.sendStatus(400);
		return;
	} else if (await ideaCollection.findOne(query)) {
		res.sendStatus(409);
		return;
	} else {
		await ideaCollection.insertOne(query);
		res.redirect("/");
	}
});

module.exports = router;
