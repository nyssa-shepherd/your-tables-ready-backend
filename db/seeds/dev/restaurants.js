exports.seed = function(knex, Promise) {
  return knex('reservations').del()
    .then(() => knex('restaurant_details').del()) 
    .then(() => knex('restaurants').del())
    .then(() => {
      return Promise.all([
        knex('restaurants').insert(
          {
            restaurant_name: 'FNG',
            username: 'fngrestaurant',
            password: 'password123',
            img_url: 'https://303magazine.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-10-at-12.53.18-PM.png'
          }, 'id')
        .then(restaurant => {
          return knex('restaurant_details').insert([
            { 
              location: '3940 W 32nd Ave, Denver, CO 80212',
              phone_number: '(303) 963-5931',
              tables_open: '0',
              wait_time: '40 min',
              restaurant_id: restaurant[0] 
            },
          ])
        })
        .then(restaurant_details => {
          return knex('reservations').insert([
            {
              name: 'Moana',
              time: '6:00 pm',
              date: '04/24/18',
              number_of_people: '7',
              rest_id: restaurant_details[0]
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) 
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};