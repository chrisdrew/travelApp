
const app = require('./app');
const supertest = require('supertest');
const request = supertest(app);

let testJson = [
	{
		geoname: {
			countryName: 'United States',
			lat: '36.44589',
			lng: '-85.67803',
			name: 'Pine Lick Creek',
			adminName1: 'Tennessee',
			population: 0
		  }
	}
];

describe('Endpoint test', () => {
	it('/test', async (done) => {
	  const response = await request.get('/test');
	  expect(response.status).toBe(200);
	  done();
	});
  });