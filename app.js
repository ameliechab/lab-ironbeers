const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', { style: ['index.css'] });
});

app.get('/beers', async (req, res) => {
  const rawResponse = await fetch('https://api.punkapi.com/v2/beers');
  const data = await rawResponse.json();
  const beers = data;
  res.render('beers', { beers: beers, style: ['beers.css'] });
});

app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  res.render('random-beer', {
    randomBeer: randomBeer,
    style: ['random-beer.css']
  });
});

app.listen(3000, () => console.log('http://localhost:3000'));
