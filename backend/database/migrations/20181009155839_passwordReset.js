
exports.up = function(knex, Promise) {
  return knex.schema.createTable('password_reset', (resetTable) => {
    resetTable.uuid('id').unique().notNullable();
    resetTable.uuid('user_id').notNullable().references('person.id');
    resetTable.string('email_recipient').notNullable();
    resetTable.timestamps(true, true);
    resetTable.dateTime('expires_at').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('password_reset');
};
