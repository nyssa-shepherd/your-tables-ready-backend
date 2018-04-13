const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  // beforeEach((done) => {
  //   database.migrate.rollback()
  //     .then(() => {
  //       database.migrate.latest()
  //         .then(() => {
  //           return database.seed.run()
  //             .then(() => {
  //               done();
  //             });
  //         });
  //     });
  // });

  describe('RESTAURANTS endpoints', () => {
    describe('GET /api/v1/restaurants', () => {
      it('return all restaurants', () => {
        return chai.request(server)
          .get('/api/v1/restaurants')
          .then( response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body[0].should.have.property('restaurant_name');
            response.body[0].should.have.property('username');
            response.body[0].should.have.property('password');
            response.body.length.should.equal(2);
          })
          .catch( err => {
            throw err;
          });
      });
    });
  });
});