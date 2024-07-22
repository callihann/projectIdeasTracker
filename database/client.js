const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.CONN_STRING, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

module.exports = client;