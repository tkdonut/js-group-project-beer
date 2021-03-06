
import { bindEventsMap } from './views/mapview.js';

const Beers = require('./models/beers.js');
const BeerStats = require('./models/beer_stats.js');

const BeerListView = require('./views/beer_list_view.js');
const BeerFormView = require('./views/beer_form_view.js');

const RandomBeerView = require('./views/random_beer_view.js');

const EditView = require('./views/edit_view.js');
const BeerStatsView = require('./views/beer_stats_view.js');

const Countries = require('./models/countries.js');
const SelectView = require('./views/select_view.js');
const EditSelectView = require('./views/edit_select_view.js');

const DateView = require('./views/date_view.js');


document.addEventListener('DOMContentLoaded', () => {

  const beerForm = document.querySelector('#form');
  const beerFormView = new BeerFormView(beerForm);
  beerFormView.bindEvents();

  const beerStatsContainer = document.querySelector('#stats');
  const beerStatsView = new BeerStatsView(beerStatsContainer);
  beerStatsView.bindEvents();

  const beerStats = new BeerStats();
  beerStats.bindEvents();

  const beerContainer = document.querySelector('#drank-beer-list');
  const beerListView = new BeerListView(beerContainer);
  beerListView.bindEvents();


  const randomBeerView = new RandomBeerView();
  randomBeerView.bindEvents();


  const editDiv = document.querySelector('#edit-div');
  const editForm = document.querySelector('#edit-form');
  const editFormView = new EditView(editDiv, editForm);
  editFormView.bindEvents();

  const dateDiv = document.querySelector('#consumed');
  const dateView = new DateView(dateDiv);
  dateView.setTodayDate();

  const url = 'http://localhost:3000/api/beers';
  const beers = new Beers(url);
  beers.bindEvents();
  beers.getData();

  bindEventsMap();
  const selectElement = document.querySelector('#countries');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const editSelectElement = document.querySelector('#edit-countries');
  const editSelectView = new EditSelectView(editSelectElement);
  editSelectView.bindEvents();

  const countriesUrl = "https://restcountries.eu/rest/v2/all";
  const countries = new Countries(countriesUrl);
  countries.getData();

});
