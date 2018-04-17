const express = require('express');
const compression = require('compression');

const app = express();
const router = express.Router();

app.use(express.static(`${__dirname}/dist`));
app.use(compression());

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.use('/', router);

app.listen(3000, () => {
  // eslint-disable-next-line
  console.log('taka-web-app - running - on 3000');
});
