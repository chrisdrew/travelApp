// http://api.geonames.org/postalCodeSearchJSON?postalcode=90210&maxRows=10&username=drew_cd

// https://www.weatherbit.io/static/img/icons/{icon_code}.png
// use the above to display the icons for it
const API_KEY  = 'd533c2e65aa65793bdef4d6bf3eb62f4';

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
	console.log('getCityWeather');
	const res = await fetch(`http://api.geonames.org/searchJSON?maxRows=1&q=${city}&username=${geonamesUN}`);

	try{
		const data = await res.json();
		const isFull = JSON.stringify(data)
		const cod = parseInt(data.cod);
		console.log(data);	
		if(data.totalResultsCount === 0){
			// Crete an alert to let them know nothing was found.
			return
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
		console.log(e);
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
		if (data.total === 0 & imageCounter === 0) {
			console.log('nothing')
			imageCounter++
			await pixabayImage(newEntry.geoname.countryName);
		} else if (data.total === 0 & imageCounter === 1) {
			console.log('nothing 2')
			imageCounter++;
			await pixabayImage(newEntry.geoname.countryName);
		}else if(data.total === 0 & imageCounter === 3){
			console.log('something');
			console.log('sorry issue with getting images');
		}
		newEntry.image = data.hits;
		console.log(data);
	} catch(e){
		console.log('error getting image!');
		console.log(e)
		return e
	}
}

const printResult = async () =>{
	console.log('print results');
	document.getElementById('location').innerText = `Your Results: ${newEntry.geoname.name}, ${newEntry.geoname.countryName}`;
	// images
	document.getElementById('main-img').src  = newEntry.image[0].webformatURL;
	document.getElementById('main-img').alt  = newEntry.image[0].tags;
	document.getElementById('img-2').src  = newEntry.image[1].webformatURL;
	document.getElementById('img-2').alt  = newEntry.image[1].tags;
	document.getElementById('img-3').src  = newEntry.image[2].webformatURL;
	document.getElementById('img-3').alt  = newEntry.image[1].tags;
	// Random info
	document.getElementById('pop').innerText = newEntry.geoname.population;
	document.getElementById('lat').innerText = newEntry.geoname.lat;
	document.getElementById('lng').innerText = newEntry.geoname.lng;
	// weather

	for (let i = 0; i<= 5; i++){
		let date = new Date(newEntry.weather[i].datetime);
		console.log(`The date day # is ${date.getDay()}`);
		let dayN = date.getDay();
		let icon = newEntry.weather[i].weather.icon;

		document.getElementById(`wd-${i+1}-date`).innerText = day[dayN+1].substring(0, 3);
		// Found this to use icons https://www.weatherbit.io/static/img/icons/r01d.png
		document.getElementById(`wd-${i+1}-icon`).src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
		document.getElementById(`wd-${i+1}-temp`).innerText = newEntry.weather[i].temp;
		document.getElementById(`wd-${i+1}-des`).innerText = newEntry.weather[i].weather.description;
	}

}

const getAPIKey = async()=>{
	const res = await fetch('/keys');

    try{
        const data = await res.json();
        console.log(`data is ${data}`);
        return 
    } catch (e){
        console.log(e);
        return
    }
}

const asyncFunction = async (zip) => {
	await getAPIKey();
	await getCity(zip);
	await weather();
	await pixabayImage(newEntry.geoname.name);
	await printResult();
}

export { asyncFunction }