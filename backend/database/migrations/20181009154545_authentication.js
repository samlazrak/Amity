
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authentication', (authTable) => {
    authTable.increments();
    authTable.timestamps(true, true);
    authTable.uuid('user_id').notNull().references('person.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authentication');
};
