
exports.up = function(knex, Promise) {
  return knex.schema.table('person', (personTable) => {
    personTable.enu('user_role', ['user', 'admin']).notNullable().defaultsTo('user');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('person', (personTable) => {
    personTable.dropColumn('user_role');
  });
};
