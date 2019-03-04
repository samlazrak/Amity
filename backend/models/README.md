# Models

Models provide the core functionality for creating, fetching, and interacting with objects in the database. Amity uses bookshelf.js for its models, which are in turn stored in a Postgres database. These models are used heavily within the `backend/api/` directory for resovling data for Amity's GraphQL schema.

## Format
All models contain an id field with a UUID for the individual object. These id's are used extensively for caching purposes within GraphQL, and for identifying individual objects. These UUIDs will be automatically generated when creating new objects, and therefore do not have to be provided when creating objects.

## Creating a new model
Before creating a new model, you must first create a Postgres table for it. See `backend/database/README.md` for this.

Let's create a hypothetical "Foo" model. Start by creating a new file under `/backend/models/foo.ts`.

Next create the Foo model by extending the Base model (`backend/models/base.ts`). This base model provides the core functionality necessary for Amity models.
```
import Base from './base';

const Foo = Base.extend({
  uuid: true,
  tableName: 'foo',
});

export default Foo;
```

We specify a couple of options when creating our new model. First is `uuid: true`, which ensures UUIDs will be created for all new objects. We also specify `tableName: 'foo'` to point the model to the correct table.

That's it! Our model is now ready to be imported and used in our API modules.

## Plugins
Amity uses a number of bookshelf plugins to simplify model logic. One of the core plugins is `bookshelf-camelcase` which maps the database columns to camel case to help keep Amity's code clean.

e.g. the following user table in Postgres:
```
+------------+-----------+-------------------------+-----------------------------------------+
| first_name | last_name | email                   | img_url                                 |
+------------+-----------+-------------------------+-----------------------------------------+
| Sam        | Doe       | sdoe@creaturebuilds.com | https://api.creaturebuilds.com/sam.jpg  |
+------------+-----------+-------------------------+-----------------------------------------+
| John       | Doe       | jdoe@creaturebuilds.com | https://api.creaturebuilds.com/john.jpg |
+------------+-----------+-------------------------+-----------------------------------------+
```

would map to the following objects:
```
{
  firstName: 'Sam',
  lastName: 'Doe',
  email: 'sdoe@creaturebuilds.com',
  imgUrl: 'https://api.creaturebuilds.com/sam.jpg',
},
{
  firstName: 'John',
  lastName: 'Doe',
  email: 'jdoe@creaturebuilds.com',
  imgUrl: 'https://api.creaturebuilds.com/john.jpg',
},
```
