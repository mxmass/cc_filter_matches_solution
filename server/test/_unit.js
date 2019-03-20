const helpers = require('../helpers/limits');

describe('Testing limits function', function () {
    describe('#check_limits()', function () {
        it('should return both constraints', function () {
            let res = helpers.check_limits(
              {MIN: 9, MAX: 101},
              'int',
              {value: 15, must: true, over: false},
              {value: undefined, must: true, over: false}
            );
            res.should.be.an('object');
            res.should.have.property('$gt')
            res.$gt.should.be.eql(14)
            res.should.have.property('$lt')
            res.$lt.should.be.eql(101)
        });
        it('should return left constraint', function () {
            let res = helpers.check_limits(
              {MIN: 9, MAX: 101},
              'int',
              {value: undefined, must: true, over: false},
              {value: undefined, must: false, over: false}
            );
            res.should.be.an('object');
            res.should.have.property('$gt')
            res.$gt.should.be.eql(9)
            res.should.not.have.property('$lt')
        });
        it('should return empty object', function () {
            let res = helpers.check_limits(
              {MIN: 9, MAX: 101},
              'int',
              {value: undefined, must: false, over: false},
              {value: undefined, must: false, over: false}
            );
            res.should.be.an('object').that.is.empty;
        });
        it('should return both constraints with no limits given', function () {
            let res = helpers.check_limits(
              {MIN: 9, MAX: 101},
              'int',
              {value: undefined, must: true, over: false},
              {value: undefined, must: true, over: false}
            );
            res.should.be.an('object');
            res.should.have.property('$gt')
            res.$gt.should.be.eql(9)
            res.should.have.property('$lt')
            res.$lt.should.be.eql(101)
        });
    });
});
