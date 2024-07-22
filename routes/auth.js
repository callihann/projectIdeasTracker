var express = require("express");
const { v4: uuidv4 } = require("uuid");
var client = require("../database/client");

var router = express.Router();
const database = client.db("ideas");
const users = database.collection("users");

/* GET login page. */
router.get("/login", function (req, res, next) {
	res.render("login");
});

/* POST login page. */
router.post("/login", async function (req, res, next) {
	const { email, password } = req.body;
	const query = { email: email, password: password };
	const user = await users.findOne(query);
	if (user === null) {
		res.render("login", { error: "Invalid email or password" });
		return;
	} else {
		res.cookie("token", user.token);
		res.redirect("/");
	}
	console.log(user);
});
/* GET signup page. */
router.get("/signup", function (req, res, next) {
	res.render("signup");
});

/* POST signup page. */
router.post("/signup", async function (req, res, next) {
	const { email, password, username } = req.body;
	const query = { email: email, username: username, password: password, token: uuidv4() };
	await users.insertOne(query);
	res.cookie("token", query.token);
	res.redirect("/");
});

router.get("/logout", async function (req, res, next) {
	res.clearCookie("token");
	res.redirect("/auth/login");
});

module.exports = router;
