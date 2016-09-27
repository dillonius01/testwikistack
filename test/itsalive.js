var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var expect = require('chai').expect

var Models = require('../models/');
var Page = Models.Page;




console.log(Page);

xdescribe('spying', function() {

	it('spies on number of times called', function() {
		var myArray = [1,2,3,4,5];
		var coolFunc = function(element) {
			return element + 1;
		};
		
		coolFunc = chai.spy(coolFunc);

		myArray.forEach(coolFunc);
	
		expect(coolFunc).to.have.been.called.exactly(5);

	})

})



describe('Methods on Page model', function() {

	describe('Hooks', function() {
		it('has a beforeValidate func that returns url-friendly title')
	})

	describe('getterMethods', function() {
		
		var page;
		beforeEach(function(){
			page = Page.build();
		})

		it('has a route that returns urltitle prepended with /wiki/ as a string', function() {
			page.urlTitle = 'dillonwearspants';
			expect(page.route).to.equal('/wiki/dillonwearspants')
		});


		it('converts MD-formatted content to HTML');
	})	

	describe('classMethods', function() {
		
		beforeEach(function(done){
			Page.create({
				title: 'Hello',
				content: 'Crying',
				tags: ['grammys', 'breakups', 'top40']
			})
			.then(function() {
				done();
			})
			.catch(done)
		})

		it('has a findByTag that takes a search tag and returns pages with the search tag', function(done) {
			
			Page.findByTag('grammys')
				.then(function(pages){
					expect(pages).to.have.lengthOf(1);
					done();
				})
				.catch(done);
		})

		it('findByTag does not get pages without the search tag', function(done) {
			
			Page.findByTag('country')
				.then(function(pages){
					expect(pages).to.have.lengthOf(0);
					done();
				})
				.catch(done);
		})
	})

	describe('instanceMethods', function() {

		beforeEach(function(done){
			var page1 = Page.create()

			Page.bulkCreate([
				{title: 'Someone Like You', content: 'Crying', tags: ['Adele', 'grammys', 'breakup']},
				{title: 'Make You Feel My Live', content: 'Dylan cover', tags: ['Adele', '19']},
				{title: 'Chasing Pavements', content: 'FeelGood', tags: ['Adele', '19', '!asphalt']},
				{title: 'Party in the USA', content: 'twerking', tags: ['tongue', 'millenials']}
				])
			.then(function(done){
				done();
			})
			.catch(done);
		})


		it('has a findSimilar method that gets pages with common tags', function(done) {

				Page.findAll({
					where: {
						title: 'Someone Like You'
					}
				})
				.then(function(pages){
					return pages[0].findSimilar();
				})
				.then(function(pages){
					expect(pages).to.have.length(2);
					done();
				})
				.catch(done);
		})

		it('findSimilar does not get pages without common tags')
		it('findSimilar does not get itself')
	})

})