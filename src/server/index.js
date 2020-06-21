const savedData = {};

// var path = require('path')
// const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

// const app = express()
// // Cors for cross origin allowance
// const cors = require('cors');
// app.use(cors());
// app.use(express.static('dist'))

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/postEntry', function (req, res){
	savedData.push(req);
	console.log(`res is ${req}`);
	res.send(savedData);
});

app.get('/get', function (req, res){
	console.log(`mockAPIResponse is now ${savedData}`);
	res.send(savedData);
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})