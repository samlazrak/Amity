import bookshelf from 'bookshelf';
// @ts-ignore
import securePassword from 'bookshelf-secure-password';
// @ts-ignore
import bookshelfUUID from 'bookshelf-uuid';
// @ts-ignore
import cascadeDelete from 'bookshelf-cascade-delete';
import knex from './knex';


const bookshelfInstance = bookshelf(knex);

bookshelfInstance.plugin('registry');
bookshelfInstance.plugin('bookshelf-camelcase');
bookshelfInstance.plugin(securePassword);
bookshelfInstance.plugin(bookshelfUUID);
bookshelfInstance.plugin(cascadeDelete);

export default bookshelfInstance;
