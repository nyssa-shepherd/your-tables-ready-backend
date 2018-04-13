exports.seed = function(knex, Promise) {
  return knex('reservations').del()
    .then(() => knex('restaurant_details').del()) 
    .then(() => knex('restaurants').del())
    .then(() => {
      return Promise.all([
        knex('restaurants').insert({
          restaurant_name: 'Nyssa\'s Restaurant',
          username: 'nyssarestaurant',
          password: 'password123'
        }, 'id')
        .then(restaurant => {
          return knex('restaurant_details').insert([
            { 
              location: '432 S Denver St, Denver, CO 80202',
              phone_number: '555-322-6094',
              tables_open: '0',
              wait_time: '40 min',
              restaurant_id: restaurant[0] 
            }
          ])
        })
        .then(restaurant_detail => {
          return knex('reservations').insert([
            {
              name: 'Moana',
              time: '6:00 pm',
              date: '04/24/18',
              number_of_people: '7',
              restaurant_id: restaurant_detail[0]
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) 
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};