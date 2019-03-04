
exports.up = function(knex, Promise) {
  return knex.schema.table('user_invite', (table) => {
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user_invite', (table) => {
    table.dropColumn('name');
  });
};
