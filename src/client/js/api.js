// https://www.weatherbit.io/static/img/icons/{icon_code}.png
// use the above to display the icons for it
import { template } from './template.js';

const geonamesUN = 'drew_cd';
const weatherKey = 'cd089be0bf224864a729444f9b266942';
const pixabayAPI = '16937709-86fc6ed88f40b2e2d1922102c';

const day = ['Sunday', 'Monday', 'Tuesday', 'Wendnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let newEntry = {
	geoname:{
		countryName: '',
		lat: '',
		lng: '',
		name: '',
		adminName1: '',
		population: 0
	},
	weather:{},
	image:{}
}

let imageCounter = 0;

const getCity = async (city) =>{
	const res = await fetch(`http://api.geonames.org/searchJSON?maxRows=1&q=${city}&username=${geonamesUN}`);

	try{
		const data = await res.json();
		const isFull = JSON.stringify(data)
		const cod = parseInt(data.cod);
		if(data.totalResultsCount === 0){
			throw "no results found";
		}else{
			console.log('here');
			newEntry.geoname.countryName = data.geonames[0].countryName;
			newEntry.geoname.lat = data.geonames[0].lat;
			newEntry.geoname.lng = data.geonames[0].lng;
			newEntry.geoname.name = data.geonames[0].name;
			newEntry.geoname.adminName1 = data.geonames[0].adminName1;
			newEntry.geoname.population = data.geonames[0].population;
			console.log(newEntry);
			return newEntry
		}
	} catch (e){
		console.error(e);
		document.getElementById('error').style.display='block';
		return
	}
}

const weather = async () =>{
	const res = await fetch (`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${newEntry.geoname.lat}&lon=${newEntry.geoname.lng}&key=${weatherKey}`);

	try{
		const data = await res.json();
		newEntry.weather = data.data;
		console.log(newEntry);
	} catch (e){
		console.log(e);
		return e
	}
}

const pixabayImage = async (location) =>{
	console.log('pixabay');
	const newLocation = location.replace(/\s/g, '+');
	console.log(`newLocation ${newLocation}`);
	const res = await fetch (`https://pixabay.com/api/?key=${pixabayAPI}&q=${newLocation}&image_type=photo&category=places&order=popular&per_page=3`);

	try{
		const data = await res.json();
		newEntry.image = data.hits;
	} catch(e){
		console.log('error getting image!');
		console.log(e)
		return e
	}
}

const printResult = async (inputDate) =>{
	console.log('print results');
	console.log(newEntry);
	document.getElementById('location').innerHTML = `<span class="result-text">Your Results:</span> ${newEntry.geoname.name}, ${newEntry.geoname.countryName}`;
	// images
	document.getElementById('main-img').src  = newEntry.image[0].webformatURL;
	document.getElementById('main-img').alt  = newEntry.image[0].tags;
	document.getElementById('img-2').src     = newEntry.image[1].webformatURL;
	document.getElementById('img-2').alt     = newEntry.image[1].tags;
	document.getElementById('img-3').src     = newEntry.image[2].webformatURL;
	document.getElementById('img-3').alt     = newEntry.image[1].tags;
	// Random info
	document.getElementById('pop').innerText = newEntry.geoname.population;
	document.getElementById('lat').innerText = newEntry.geoname.lat;
	document.getElementById('lng').innerText = newEntry.geoname.lng;
	// weather
	let i = 0;
	let j = 0;
	let k = 1;
	console.log(`inputDate = ${inputDate}`)
	for (let h=0; h <= newEntry.weather.length -1; h++) {
		console.log(h);
		console.log(`newEntry.weather[h].datetime = ${newEntry.weather[h].datetime}`)
		if(newEntry.weather[h].datetime == inputDate){
			console.log(newEntry.weather[h].datetime, inputDate)
			console.log(`breaking out of h ${h}`)
			j = h;
			break;
		}
	}

	console.log(`i is starting @ ${j}`);
	for (i=j; i<= j+5; i++){
		let date = new Date(newEntry.weather[i].datetime);
		console.log(`The date day # is ${date.getDay()}`);
		let dayN = date.getDay();
		let icon = newEntry.weather[i].weather.icon;
		document.getElementById(`wd-${k}-date`).innerText = day[dayN+1].substring(0, 3);
		// Found this to use icons https://www.weatherbit.io/static/img/icons/r01d.png
		document.getElementById(`wd-${k}-icon`).src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
		document.getElementById(`wd-${k}-temp`).innerText = newEntry.weather[i].temp;
		document.getElementById(`wd-${k}-des`).innerText = newEntry.weather[i].weather.description;
		
		console.log('-------')
		console.log(`k is now ${k}`);
		console.log('-------')
		k++;
	}

}

const asyncFunction = async (city, date) => {
	document.getElementById('error').style.display='none';
	await getCity(city);
	if (newEntry.geoname.countryName !== '') {
		await weather();
		await pixabayImage(newEntry.geoname.name);
		if(JSON.stringify(newEntry.image) === '[]') {
			await pixabayImage(newEntry.geoname.countryName);
		}
		await template();
		await printResult(date);
	}
	
}

export { asyncFunction }