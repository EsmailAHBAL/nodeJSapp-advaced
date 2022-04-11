var chai = require('chai');
var should =chai.should();
var expect = chai.expect;
var assert = chai.assert;

const request =require('supertest');
const app = require('../app');


describe('GET /user', function() {
    it('return list of books', function(done) {
      request(app)
        .get('/user/all')
        .expect(200).end(done)
        
    })
  })

  describe('/POST book', () => {
    it('it should not POST a book without pages field', (done) => {
        let user = {
            username: "latafa",
            email: "latafsa@gmail.com",
            password: "imane",
            image:"hey.png"
        }
     request(app)
          .post('/user/add')
          .send(user)
          .end((err, res) => {
               
                //  res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });

});