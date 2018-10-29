const express = require('express');
const session = require('express-session');
const compression = require('compression');
const mongoSessionStore = require('connect-mongo');
const next = require('next');
const mongoose = require('mongoose');
const helmet = require('helmet');

const auth = require('./google');
const api = require('./api');

const logger = require('./logs');

require('dotenv')
  .config();

const {
  NODE_ENV, PORT, PROD_URL, MONGO_URL_TEST, MONGO_URL, SESSION_ID, SESSION_SECRET,
} = process.env;

const dev = NODE_ENV !== 'production';
const port = PORT || 8000;
const rootUrl = dev ? `http://localhost:${port}` : PROD_URL;

const mongoUrl = dev ? MONGO_URL_TEST : MONGO_URL;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(
  mongoUrl,
  options,
);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(helmet());
    server.use(compression());
    server.use(express.json());

    server.get('/_next/*', (req, res) => {
      handle(req, res);
    });

    server.get('/static/*', (req, res) => {
      handle(req, res);
    });

    const MongoStore = mongoSessionStore(session);
    const sess = {
      name: SESSION_ID,
      secret: SESSION_SECRET,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60, // save session 14 days
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
      },
    };

    if (!dev) {
      server.set('trust proxy', 1); // trust first proxy
      sess.cookie.secure = true; // serve secure cookies
    }

    server.use(session(sess));

    auth({
      server,
      rootUrl,
    });
    api(server);

    server.get('*', (req, res) => {
      handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      logger.info(`> Ready on ${rootUrl}`);
    });
  });
