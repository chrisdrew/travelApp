const request = require('supertest');
const app = require('./index');
// const data = require('./mockAPI.js')


// describe('Sample Test', () => {
// 	it('should test that true === true', () => {
// 	  expect(true).toBe(true)
// 	})
//   })

//   describe('Post Endpoints', () => {
// 	it('should create a new post', async () => {
// 	  const res = await request(app)
// 		.post('/postEntry')
// 		.send({
// 			geoname: {
// 				countryName: 'United States',
// 				lat: '36.44589',
// 				lng: '-85.67803',
// 				name: 'Pine Lick Creek',
// 				adminName1: 'Tennessee',
// 				population: 0
// 			}
// 		})
// 	  expect(res.statusCode).toEqual(201)
// 	  expect(res.body).toHaveProperty('post')
// 	})
//   })