const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
// const favicon = require('serve-favicon');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.set('port', process.env.PORT || 8081);
// app.set('views', './src/views');
// app.set('view engine', 'jade');
app.set('x-powered-by', false);
app.use(compression({
  level: 1,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());

// app.use(favicon('./favicon.ico'));

app.use(express.static('./dist'));

app.use((req, res) => {
  res.sendStatus(404);
});

server.listen(app.get('port'), () => {
  console.log(`Server listen on port ${app.get('port')}`);
  return;
});
