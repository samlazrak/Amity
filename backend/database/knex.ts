import knex from 'knex';
import config from 'config';
import path from 'path';

const knexInstance = knex({
  client: 'pg',
  connection: config.get('postgres.url'),
});

knexInstance.migrate.latest({
  directory: path.join(__dirname, '/migrations'),
});

export default knexInstance;
