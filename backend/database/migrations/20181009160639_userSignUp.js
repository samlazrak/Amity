
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_invite', (inviteTable) => {
    inviteTable.uuid('id').notNullable().unique();
    inviteTable.string('email').notNullable();
    inviteTable.dateTime('expires_at').notNullable();
    inviteTable.timestamps(true, true);
    inviteTable.uuid('invited_by').notNullable().references('person.id');
    inviteTable.boolean('user_registered').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_invite');
};
