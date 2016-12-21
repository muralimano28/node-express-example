const Express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// Path constants
const RootPath = "/";
const AddQuotePath = "/add-quote";

// File directories
const IndexHTML = "index.ejs";

// Create a new express app.
const App = Express();

// Middlewares
App.use(BodyParser.urlencoded({ extended: true }));

App.set('view engine', 'ejs');

// Connect to database.
MongoClient.connect('mongodb://127.0.0.1:27017/starwarsQuotesDB', (err, db) => {
	if (err) return console.log(err);

	console.log("Connected to db");

	// Handlers.
	App.listen(3000, () => {
		console.log("Listening at 3000");
	});

	App.get(RootPath, (req, res) => {
		db.collection("quotes").find().toArray((err, result) => {
			if (err) return console.log("err: ", err);

			res.render(IndexHTML, { quotes: result });
		});

	});

	App.post(AddQuotePath, (req, res) => {
		db.collection("quotes").save(req.body, (err, result) => {
			if (err) return console.log("err: ",err);

			console.log("Saved to database");
			res.redirect(RootPath);
		});
	});

});
