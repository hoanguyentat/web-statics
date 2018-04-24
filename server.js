const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const configDB = require('./server/config/config').database;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const mongooseConnection = mongoose.connect(configDB.url).then(() => {
  console.log("Connect successful...")
}).catch((err) => {
  console.log(err);
})

const api = require('./server/routes/api');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	 	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));