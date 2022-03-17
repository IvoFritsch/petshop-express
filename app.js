var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'senha123',
  resave: false,
  saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Esse middleware serve para adicionar os dados do login de forma que esteja acessivel em todos os arquivo EJS
app.use(function adicionaUserNoRender(req, res, next) {

  // De acordo com a documentação do express, o objeto res.locals pode ser usado para adicionar dados globais usados em todos os arquivos EJS
  // http://expressjs.com/en/api.html#res.locals
  res.locals.estaLogado = req.session.estaLogado
  res.locals.usuarioLogado = req.session.usuarioLogado
  next()
})

app.use('/', require('./routes/index'));
app.use('/produtos', require('./routes/produtos'))
app.use('/admin', require('./routes/admin'))
app.use('/api', require('./routes/api'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
