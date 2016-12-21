const Express = require('express');
const App = Express();

// Path constants
const RootPath = "/";

// Directories
const IndexHTML = __dirname + "/index.html";

App.listen(3000, () => {
	console.log("Listening at 3000");
});

App.get(RootPath, (req, res) => {
	res.sendFile(IndexHTML);
});
