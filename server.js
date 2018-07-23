const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3004;

var app = express();

const hbs = require('hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();

  var logMsg = `${now}: ${req.method} ${req.url} \n`;

  fs.appendFileSync("server.log", logMsg, (err) => {
    console.log('Unable to write file');
  });

  next();
});

app.use((req, res, next) => {
  //res.render('maintanance.hbs');
  next();
});
app.set('view engine', 'hbs');


hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    onlyHome: 'This is only HOme'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page hiii',
    onlyAbout: 'This is only about'
  });
});

// /bad - send back json with er - send back json with errorMessagerorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ',port);
});
