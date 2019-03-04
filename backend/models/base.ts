import bookshelf from '../database/bookshelf';
import { toSnakeCase } from './../utils/case-converter';

const Base = bookshelf.Model.extend({
  where(...args: [any]) {
    const query = args.slice(0);

    if (typeof query[0] === 'object') {
      query[0] = toSnakeCase(query[0]);
    }

    bookshelf.Model.prototype.where.apply(this, query);
    return this;
  },
});

export default Base;
