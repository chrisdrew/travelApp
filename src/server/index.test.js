
const app = require('./index');
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
 
// app.get('/user', function(req, res) {
//   res.status(200).json(testJson);
// });
 
// test('Get content', () => {
// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });
// });