// http://api.geonames.org/postalCodeSearchJSON?postalcode=90210&maxRows=10&username=drew_cd

// https://www.weatherbit.io/static/img/icons/{icon_code}.png
// use the above to display the icons for it

const API_KEY  = 'd533c2e65aa65793bdef4d6bf3eb62f4';

const geonamesUN = 'drew_cd';
const weatherKey = 'cd089be0bf224864a729444f9b266942';
const pixabayAPI = '16937709-86fc6ed88f40b2e2d1922102c';

let newEntry = {
	geoname:{
		countryName: '',
		lat: '',
		lng: '',
		name: '',
	},
	weather:{},
	image:{}
}

const getCity = async (city) =>{
	console.log('getCityWeather');
	const res = await fetch(`http://api.geonames.org/searchJSON?maxRows=1&q=${city}&username=${geonamesUN}`);

	try{
		const data = await res.json();
		const isFull = JSON.stringify(data)
		const cod = parseInt(data.cod);
		console.log(data.totalResultsCount);	
		if(data.totalResultsCount === 0){
			// Crete an alert to let them know nothing was found.
			return
		}else{
			console.log('here');
			newEntry.geoname.countryName = data.geonames[0].countryName;
			newEntry.geoname.lat = data.geonames[0].lat;
			newEntry.geoname.lng = data.geonames[0].lng;
			newEntry.geoname.name = data.geonames[0].name;
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

const pixabayImage = async () =>{
	console.log('pixabay');
	const res = await fetch (`https://pixabay.com/api/?key=${pixabayAPI}&q=${newEntry.geoname.name}&image_type=photo&category=places&order=popular&per_page=3`);

	try{
		const data = await res.json();
		console.log(data);
	} catch(e){
		console.log(e)
		return e
	}
}


const asyncFunction = async (zip) => {
	// await getCityWeather(zip);
	await getCity(zip);
	await weather();
	await pixabayImage();
}

export { asyncFunction }