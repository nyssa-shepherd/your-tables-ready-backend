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

  for (let requiredParameter of ['restaurant_name', 'username', 'password', 'img_url']) {
    if (!restaurantInfo[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('restaurants').insert(restaurantInfo, 'id')
    .then(restaurant => {
      const { restaurant_name, username, password, img_url } = restaurantInfo;
      response.status(201).json({ id: restaurant[0], restaurant_name, username, password, img_url });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/restaurants/:id/restaurant_details', (request, response) => {
  const restaurant_id = request.params
  const restaurantInfo = request.body;

  for (let requiredParameter of ['location', 'phone_number', 'tables_open', 'wait_time']) {
    if (!restaurantInfo[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('restaurant_details').insert(restaurantInfo, 'id', restaurant_id)
    .then(restaurant => {
      const { location, phone_number, tables_open, wait_time } = restaurantInfo;
      response.status(201).json({ id: restaurant[0], restaurant_id, location, phone_number, tables_open, wait_time });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`Restaurant App is running on ${app.get('port')}.`);
});

module.exports = app;