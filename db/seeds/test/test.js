exports.seed = function(knex, Promise) {
  return knex('reservations').del()
    .then(() => knex('restaurant_details').del()) 
    .then(() => knex('restaurants').del())
    .then(() => {
      return Promise.all([
        knex('restaurants').insert({
          restaurant_name: 'Test Restaurant',
          username: 'testrestaurant',
          password: 'password234'
        }, 'id')
        .then(restaurant => {
          return knex('restaurant_details').insert([
            { 
              location: '432 S Test St, Denver, CO 80202',
              phone_number: '555-344-6094',
              tables_open: '3',
              wait_time: '10 min',
              restaurant_id: restaurant[0] 
            }
          ])
        })
        .then(restaurant_detail => {
          return knex('reservations').insert([
            {
              name: 'Ariel',
              time: '5:00 pm',
              date: '04/29/18',
              number_of_people: '3',
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