const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/api/v1/restaurants', (request, response) => {
  database('restaurants').select()
    .then( restaurants => {
      response.status(200).json(restaurants);
    })
    .catch( error => {
      response.status(404).json({ error });
    })
});

app.get('/api/v1/restaurants/:id/', (request, response) => {
  const { id } = request.params;

  database('restaurants').where('id', id)
    .then( restaurant => {
      response.status(200).json(restaurant);
    })
    .catch( error => {
      response.status(404).json({ error });
    })
});

app.listen(app.get('port'), () => {
  console.log(`Restaurant App is running on ${app.get('port')}.`);
});

module.exports = app;