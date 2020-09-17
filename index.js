const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let isDisableKeepAlive = false;

var illustRouter = require('./routes/illust.route');

const models = require('./models');
models.sequelize
  .sync()
  .then(() => {
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
  })
  .catch((err) => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

app.use(function (req, res, next) {
  if (isDisableKeepAlive) {
    res.set('Connection', 'close');
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/illust', illustRouter);
app.use((req, res, next) => {
  next(new Error('Sorry cant find that!'));
});
app.use((err, req, res, next) => {
  var result = {
    error: {
      code: 500,
      message: err.message,
    },
  };

  console.log(err.stack);
  res.status(500).send(result);
});

app.listen(port, function () {
  process.send('ready');
  console.log(`application is listening on port ${port}...`);
});

process.on('SIGINT', function () {
  isDisableKeepAlive = true;
  app.close(function () {
    console.log('server closed');
    process.exit(0);
  });
});
