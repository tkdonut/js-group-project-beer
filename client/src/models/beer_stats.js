const PubSub = require('../helpers/pub_sub.js');

const BeerStats = function(){
  this.beerArray = null;
  this.beerStats = null;
};

BeerStats.prototype.bindEvents = function(){
  PubSub.subscribe('Beers:data-loaded', event => {
    this.beerArray = event.detail;
    this.calculateStats();
    PubSub.publish('BeerStats:BeerStatsCalculated', this.beerStats);
  });
};

BeerStats.prototype.calculateStats = function(){

  // Various function calls to calculate the individual stats go here
   
  if (this.beerArray.length === 0){
  this.beerStats = null;  
    return;
  }


  const uniqueCountries = this.countriesDrank();
  const numBeersDrank = this.beerArray.length;
  const averageRating = this.averageRating();
  const averageABV = this.averageABV();

  // Package the various stats into an object for publication

  this.beerStats =
    {
      'numBeersDrank': numBeersDrank,
      'averageRating': averageRating,
      'averageABV': averageABV,
      'uniqueCountries': uniqueCountries
    };
};

BeerStats.prototype.countriesDrank = function(){
  const countryArray = this.beerArray.map( beer => beer.country);
  const uniqueCountries = [...new Set(countryArray)];
  return uniqueCountries;
};

BeerStats.prototype.averageRating = function(){
  // This function takes in a list of beers objects and returns the average rating of each
  const ratingsArray = this.beerArray.map( beer => Number(beer.rating) );
  const ratingsAvg = (
    ratingsArray.reduce((acc, rating) => acc + rating)
    / ratingsArray.length
  ).toFixed(2);
  return ratingsAvg;

};

BeerStats.prototype.averageABV = function(){
  // This function takes in a list of beer objects and returns the average ABV
  const abvArray = this.beerArray.map( beer => Number(beer.abv) );
  const abvAvg = (
    abvArray.reduce((acc, abv) => acc + abv)
    / abvArray.length
  ).toFixed(2);
  return abvAvg;
};

module.exports = BeerStats;
