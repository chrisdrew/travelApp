
import { asyncFunction } from './js/api'


import './styles/resets.scss'
import './styles/base.scss'



document.getElementById('submit').addEventListener('click', (e) => {
	e.preventDefault();
	console.log('click');
	let city = document.getElementById('name').value;
	let date = document.getElementById('travel-day').value;
	// if no date was selected, select current date.
	if(date === ''){
		let newDate = new Date();
		date = newDate.toISOString().slice(0, 10);
	}
	console.log(date);
	asyncFunction(city, date);
});

export {
	asyncFunction
}
