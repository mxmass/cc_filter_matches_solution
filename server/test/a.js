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
				done()
			})
	})
})
