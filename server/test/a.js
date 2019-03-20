describe('Initial', () => {
	describe('Call API root with GET verb', () => {
	  it('should return API welcome message', (done) => {
			chai.request(server)
		    .get('/')
		    .end((err, res) => {
			  	res.should.have.status(200)
			  	res.text.should.be.eql('API is running')
		      done()
				})
	  })
  })
})

describe('Get all persons list', () => {
	it('should return persons list array with length of 25 as seeded', (done) => {
		chai.request(server)
			.post('/')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(200)
				res.body.should.be.an('array')
				res.body.length.should.be.eql(25)
				res.body[0].should.be.an(object)
				res.body[0].should.have.property('_id')
				res.body[0].should.have.property('display_name')
				res.body[0].should.have.property('age')
				res.body[0].should.have.property('job_title')
				res.body[0].should.have.property('height_in_cm')
				res.body[0].should.have.property('location')
				res.body[0].should.have.property('compatibility_score')
				res.body[0].should.have.property('contacts_exchanged')
				res.body[0].should.have.property('favourite')
				res.body[0].should.have.property('religion')
				done()
			})
	})
})
