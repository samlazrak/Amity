
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cache_key', (cacheKeysTable) => {
    cacheKeysTable.uuid('id').notNullable().unique();
    cacheKeysTable.string('key').notNullable().unique();
    cacheKeysTable.string('ttl').notNullable().defaultTo('30m');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cache_key');
};
