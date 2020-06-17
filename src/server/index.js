var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

const dotenv = require('dotenv');
dotenv.config();

console.log(`Your new API key is ${process.env.API_KEY}`);
const API_KEY = process.env.API_KEY;

const keys = {
	API_KEY:'d533c2e65aa65793bdef4d6bf3eb62f4',
	geonamesUN:'drew_cd',
	weatherKey:'cd089be0bf224864a729444f9b266942',
	pixabayAPI:'16937709-86fc6ed88f40b2e2d1922102c'
}


console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})

app.get('/test', function (req, res) {
	
    res.send(mockAPIResponse)
})

app.get('/keys', function(){
	res.send(keys);
})