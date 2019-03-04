
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user_invite', (table) => {
      table.dropColumn('expires_at');
    }),
    knex.schema.table('password_reset', (table) => {
      table.dropColumn('expires_at');
      table.boolean('used').notNullable().defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user_invite', (table) => {
      table.dateTime('expires_at').notNullable();
    }),
    knex.schema.table('password_reset', (table) => {
      table.dateTime('expires_at').notNullable();
    })
  ]);
};
