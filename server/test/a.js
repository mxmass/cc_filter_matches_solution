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
	it('should return array of 25 items, checking 1st for values', (done) => {
		chai.request(server)
			.post('/')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(200)
				res.body.should.be.an('array')
				res.body.length.should.be.eql(25)
				res.body[0].should.be.an('object')
				res.body[0].should.have.property('_id')
				res.body[0].should.have.property('display_name').to.be.eql('Angie')
				res.body[0].should.have.property('age').to.be.eql(50)
				res.body[0].should.have.property('job_title').to.be.eql('Accountant')
				res.body[0].should.have.property('height_in_cm').to.be.eql(153)
				res.body[0].location.should.have.property('_id')
				res.body[0].location.should.have.property('type').to.be.eql('Point')
				res.body[0].location.coordinates.should.have.all.members([-4.629179,55.458565])
				res.body[0].should.have.property('compatibility_score').to.be.eql(0.93)
				res.body[0].should.have.property('contacts_exchanged').to.be.eql(8)
				res.body[0].should.have.property('favourite').to.be.eql(true)
				res.body[0].should.have.property('religion').to.be.eql('Atheist')
				done()
			})
	})
})
