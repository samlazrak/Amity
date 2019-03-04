[![Build Status](https://travis-ci.com/creaturebuilds/amity.svg?token=2mJiqhzs9KLeywNzb84z&branch=master)](https://travis-ci.com/creaturebuilds/amity)

# amity

Amity is a client facing app by Creature that provides time tracking, analytics, and documentations for jobs.

## Getting Started

Before running Amity ensure that both Node.js (^8.12.0) and Postgres (~9.6) are installed.

### Configuring A Development Enviroment

Let's start by creating a new file under `config/development.json`. We'll place all necessary environment variables here.

For Amity to run we first need to configure a database for it. The SQL script provided below will create one for you, but feel free to make your own.
```
CREATE USER nodeamity;
CREATE DATABASE amity;
GRANT ALL PRIVILEGES ON DATABASE amity to nodeamity;
```

Now, let's add our new database to our development config file:
```
{
  "postgres": {
    "url": "postgres://amity:@localhost:5432/amity"
  }
}
```

Amity relies on several external APIs and platforms. These include:
- Sentry.io (raven)
- Okta
- Sendgrid
- Procore

If you don't have access to generate API keys or tokens for these, ping @dev-issues.

Let's update our `config/development.json` file to match this:
```
{
  "postgres": {
    "url": "postgres://amity:@localhost:5432/amity"
  },
  "raven": {
    "dsn": "<your-raven-dsn>"
  },
  "sendgrid": {
    "key": "<your-sendgrid-api-key>"
  },
  "procore": {
    "auth": {
      "client_id": "<your-procore-client-id>",
      "client_secret": "<your-procore-client-secret>"
    }
  }
}
```

Finally we need to add certificates for authentication. These will be used to sign JWTs used by the client. Follow the guide here to generate them:(todo).

Now that we've generated our auth certificates, we can add `jwt.cert` and `jwt.pub` fields to our config file.

Once this is done, our final `config/development.json` file should look like this:
```
{
  "postgres": {
    "url": "postgres://amity:@localhost:5432/amity"
  },
  "raven": {
    "dsn": "<your-raven-dsn>"
  },
  "sendgrid": {
    "key": "<your-sendgrid-api-key>"
  },
  "jwt": {
    "cert": "<your-jwt-cert>",
    "pub": "<your-jwt-pub>"
  }
}
```

## Running Amity

Now that we've set up our configuration file, we're ready to start an Amity instance.

Simply run:
```
yarn watch
```

This script will compile our TypeScript, run Amity, and restart the app after any file changes. It actually runs two seperate sub-scripts, one for the frontend client and one for our backend.

## Deploying New Changes

Todo.
