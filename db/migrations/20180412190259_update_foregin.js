exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('reservations', function(table) {
      table.integer('rest_id').unsigned()
      table.foreign('rest_id')
        .references('restaurant_details.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('reservations', function(table) {
      table.dropColumn('rest_id');
    })
  ]);
};