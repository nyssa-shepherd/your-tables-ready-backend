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
          })
          .catch( err => {
            throw err;
          });
      });

      it('return specific restaurant', () => {
        return chai.request(server)
          .get('/api/v1/restaurants/5')
          .then( response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body[0].should.have.property('restaurant_name');
            response.body[0].should.have.property('username');
            response.body[0].should.have.property('password');
            response.body.length.should.equal(1);
          })
          .catch( err => {
            throw err;
          });
      });
    });

    describe('POST /api/v1/restaurants', () => {
      it('add a new restaurant given the correct data', () => {
        return chai.request(server)
          .post('/api/v1/restaurants')
          .send({
            restaurant_name: 'Sweet Restaurant',
            username: 'sweetrestaurant',
            password: 'password939'
          })
          .then(response => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('restaurant_name');
            response.body.should.have.property('username');
            response.body.should.have.property('password');
          })
          .catch(err => {
            throw err;
          });
      });
    });
  });
  
  describe('RESTAURANT_DETAILS endpoints', () => {
    describe('GET /api/v1/restaurant_details', () => {
      it('return all restaurant details', () => {
        return chai.request(server)
          .get('/api/v1/restaurant_details')
          .then( response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body[0].should.have.property('location');
            response.body[0].should.have.property('phone_number');
            response.body[0].should.have.property('tables_open');
            response.body[0].should.have.property('wait_time');
          })
          .catch( err => {
            throw err;
          });
      });

      it('return a specific restaurants details', () => {
        return chai.request(server)
          .get('/api/v1/restaurant_details/5')
          .then( response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body[0].should.have.property('location');
            response.body[0].should.have.property('phone_number');
            response.body[0].should.have.property('tables_open');
            response.body[0].should.have.property('wait_time');
            response.body.length.should.equal(1);
          })
      });
    });

    describe('POST /api/v1/restaurant_details', () => {
      it('create new restaurant details when given the correct data', () => {
        return chai.request(server)
          .post('/api/v1/restaurant_details')
          .send({
            location: '123 North Street, Denver, CO 80206',
            phone_number: '555-389-9098',
            tables_open: '2',
            wait_time: '0 min'
          })
          .then(response => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('location');
            response.body.should.have.property('phone_number');
            response.body.should.have.property('tables_open');
            response.body.should.have.property('wait_time');
          })
          .catch(err => {
            throw err;
          });
      });
    });
  });
});