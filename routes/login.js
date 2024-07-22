var express = require("express");
var router = express.Router();
var client = require("../database/client");

/* GET login page. */
router.get("/", function (req, res, next) {
	res.render("login");
});

const database = client.db("ideas");
const users = database.collection("users");

router.post("/", async function (req, res, next) {
	const { email, password } = req.body;
    const query = { email: email, password: password};
    const user = await movies.findOne(query);
});

module.exports = router;
