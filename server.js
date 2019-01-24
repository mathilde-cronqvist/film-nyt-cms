// IMPORTS
// ============================================================================
const express = require('express');
const pjson = require('./package.json');
const fs = require('fs');
const port = process.env.PORT || 3000;
const debug = require('debug')('kodebase');

// SERVER
// ============================================================================
const app = express();

// CONFIG
// ============================================================================
require('./config/index')(app);


// ROUTES
require('./routes/index')(app);


// END OF SCRIPTING
// ============================================================================
app.use((req, res) => {
	res.status(404);
	res.render('page', { 'title': '404: Not Found', 'content': error });
});

app.use((error, req, res, next) => {
	res.status(500);
	res.render('page', { 'title': '500: Internal Server Error', 'content': error });
});

// SERVER INIT
// ============================================================================
app.listen(port, () => {
	console.log('http://localhost:' + port);
});
