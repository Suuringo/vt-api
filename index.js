require('dotenv').config();
require('./apps/api').main();

const { logger } = require('./modules');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const PORT = +process.env.PORT || 2434;
const app = express();

app.use(helmet());
app.use(cors());

app.use(require('./apps/routes'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ 'endpoints': ['live', 'channels', 'videos'] });
});

app.listen(PORT, () => {
  logger.app('API is now accessible at localhost:%d', PORT);
});

app.use(require('./apps/routes'));
