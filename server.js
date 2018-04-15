const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('express-cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/restaurants', (request, response) => {
  database('restaurants').select()
    .then( restaurants => {
      response.status(200).json(restaurants);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/restaurants/:id/', (request, response) => {
  const { id } = request.params;

  database('restaurants').where('id', id)
    .then( restaurant => {
      response.status(200).json(restaurant);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/restaurant_details', (request, response) => {
  database('restaurant_details').select()
    .then( restaurants => {
      response.status(200).json(restaurants);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/restaurants/:id/restaurant_details', (request, response) => {
  const { id } = request.params;

  database('restaurant_details').where('restaurant_id', id)
    .then( details => {
      response.status(200).json(details);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/restaurant_details/:id/', (request, response) => {
  const { id } = request.params;

  database('restaurant_details').where('id', id)
    .then( restaurant => {
      response.status(200).json(restaurant);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.post('/api/v1/restaurants', (request, response) => {
  const restaurantInfo = request.body;

  for (let requiredParameter of ['username', 'password', 'restaurant_name']) {
    if (!restaurantInfo[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> }. 
          You're missing a "${requiredParameter}" property.` });
    }
  }

  database('restaurants').insert(restaurantInfo, 'id')
    .then(restaurant => {
      const { username, password, restaurant_name } = restaurantInfo;
      response.status(201).json({ id: restaurant[0], username, password, restaurant_name });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`Restaurant App is running on ${app.get('port')}.`);
});

module.exports = app;