var supertest = require('supertest');
var app = require('../index');
var agent = supertest.agent(app);
var models = require('../models');
var Page = models.Page;
var User = models.User;



describe('HTTP routes', function() {


	describe('GET /wiki route', function() {
		it('gets 200 on index', function(done) {
			agent
			  .get('/wiki')
			  .expect(200, done)
		})
	})


//We got to here!!!
	describe('POST /wiki route', function() {

		it('creates a new wiki page', function(done) {
			agent
			  .post('/wiki/')
			  .send({
			  	title: 'Pineapple',
			  	content: 'Yellow meatstuff'
			  })
			  .expect(function(res) {
			  	console.log(res)
			  	res.status = 200
			  })
			  .end(done)
		})
	})



	describe('GET /wiki/add route', function() {
		it('gets 200 on index', function(done) {
			agent
			  .get('/wiki/add')
			  .expect(200, done)
		})
	})


	describe('GET /wiki/:urlTitle route', function() {
		
		before(function(){
			Page.create({
				title: 'Pizza',
				content: 'All mushrooms'
		})
	})

		it('gets 404 on page that does not exist', function(done) {
			agent
			  .get('/wiki/sandwich')
			  .expect(function(err) {
			  	err.status = 404;
			  	err.message = 'That page was not found'
			  })
			  .end(done)
		})

		it('gets 200 on page that does exist', function(done) {
			agent
			  .get('/wiki/Pizza')
			  .expect(200, done)
		})

	})

	xdescribe('GET /wiki/:urlTitle/similar route', function() {


	})

	xdescribe('GET /wiki/:urlTitle/edit route', function() {


	})

	xdescribe('POST /wiki/:urlTitle/edit route', function() {


	})

	xdescribe('GET /wiki/:urlTitle/delete route', function() {


	})

})