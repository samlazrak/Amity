
exports.up = function(knex) {
  return knex.schema.createTable('person', (personTable => {
    personTable.uuid('id').unique().notNullable();
    personTable.string('name').notNullable();
    personTable.string('email').unique().notNullable();
    personTable.string('spassword');

    personTable.primary('id');
  }));
};

exports.down = function(knex) {
  return knex.schema.dropTable('person');
};
