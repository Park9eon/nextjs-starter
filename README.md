# Config

> $ yarn install

Node env `.env`

```dotenv
PROD_URL=

GA_TRACKING_ID=

MONGO_URL=
MONGO_URL_TEST=
SESSION_ID=
SESSION_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

NextJS env (Public) `next.config.js`

```js
require('dotenv').config();

module.exports = {
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    PROD_URL: process.env.PROD_URL,
    PORT: process.env.PORT,
  },
};
```

# Dev

> $ yarn dev
