var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
chai.should();
chai.use(require('chai-things'));

var expect = require('chai').expect

var Models = require('../models/');
var Page = Models.Page;
var User = Models.User;


before(function(done) {
	User.sync({force:true})
    	.then(function () {
        	return Page.sync({force:true});
	    })
    	.then(function() {
        	done();
    });
});


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



xdescribe('Methods on Page model', function() {

	describe('Hooks', function() {
		it('has a beforeValidate func that returns url-friendly title')
	})

	xdescribe('getterMethods', function() {
		
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

	xdescribe('classMethods', function() {
		
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

		before(function(done){

			var page1 = Page.create({title: 'Someone Like You', content: 'Crying', tags: ['Adele', 'grammys', 'breakup', 'uniquetag']})

			var page2 = Page.create({title: 'Make You Feel My Live', content: 'Dylan cover', tags: ['Adele', '19', 'uniquetag']})

			var page3 = Page.create({title: 'Chasing Pavements', content: 'FeelGood', tags: ['Adele', '19', '!asphalt', 'uniquetag']})
			
			var page4 = Page.create({title: 'Party in the USA', content: 'twerking', tags: ['tongue', 'millenials']})
				
			
			Promise.all([page1, page2, page3, page4])
				.then(function(){
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
					// expect(pages).to.have.length(2);				 

					pages.forEach(function(page) {
						expect(page.tags.indexOf('uniquetag')).to.not.equal(-1);
					})
					done();

				})
				.catch(done);		

		})
		it('findSimilar does not get itself', function(done) {

			Page.findOne({
					where: {
						title: 'Someone Like You'
					}
				})
				.then(function(page){
					return page.findSimilar();
				})
				.then(function(pages){

					pages.forEach(function(page) {
						// console.log(page.dataValues)
						expect(page.title).to.not.equal('Someone Like You');
					})
					done();

				})
				.catch(done);		

		})
	})

	describe('Validations', function() {


		it('errors with null title', function(done) {
			
			Page.create({
				title: null,
				content: 'Crying',
				tags: ['grammys', 'breakups', 'top40']
			})
			.then(done)
			.catch(function(err) {
				expect(err).to.exist;
				expect(err.errors).to.exist;
				expect(err.errors[0].path).to.equal('title');
				done();
			})
			.catch(done)
		})


		it('errors with null content', function(done) {
			
			Page.create({
				title: 'Valid',
				content: null,
				tags: ['grammys', 'breakups', 'top40']
			})
			.then(done)
			.catch(function(err) {
				expect(err).to.exist;
				expect(err.errors).to.exist;
				expect(err.errors[0].path).to.equal('content');
				done();
			})
			.catch(done)


		})

		it('errors with status set to anything except open/closed', function(done) {
			
			Page.create({
				title: 'valid',
				content: 'whoop',
				tags: ['grammys', 'breakups', 'top40'],
				status: 'throw_error'
			})
			.then(done)
			.catch(function(err) {
				expect(err).to.exist;
				expect(err.message.indexOf('status')).to.not.equal(-1)
				done();
			})
			.catch(done)

		})


	})

	describe('Hooks', function() {

		var page;
		beforeEach(function(){
			page = Page.build({
				title: 'What The Fuck Man',
				content: 'no null, silly'
			});
		})

		it('sets a urltitle after validating', function(done) {
			//page.validate() does NOT RUN THE HOOKS!!!
			page.save()
				.then(function(page){
					console.log(page.dataValues);
					expect(page.urlTitle).to.exist;
					expect(page.urlTitle.length).to.be.above(5);
					done();
				})
				.catch(done)




			
		})

	})

})
