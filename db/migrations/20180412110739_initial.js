exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('restaurants', function(table) {
      table.increments('id').primary();
      table.string('restaurant_name');
      table.string('username');
      table.string('password');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('restaurant_details', function(table) {
      table.increments('id').primary();
      table.string('location');
      table.string('phone_number');
      table.string('tables_open');
      table.string('wait_time');
      table.integer('restaurant_id').unsigned()
      table.foreign('restaurant_id')
        .references('restaurants.id');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('reservations', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('time');
      table.string('date');
      table.string('number_of_people');
      table.integer('restaurant_id').unsigned()
      table.foreign('restaurant_id')
        .references('restaurants_details.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('restaurants'),
    knex.schema.dropTable('restaurant_details'),
    knex.schema.dropTable('reservations')
  ]);
};