import axios from 'axios';
import { APIKEY } from './api.js';

const checkIsProperString = (val, variable) => {
  if (typeof val !== 'string' || val.trim() === '') {
    throw `Error: Invalid string${variable || ''} given`;
  }
};

const checkIsProperNumber = (val, variable) => {
  if (typeof val !== 'number' || isNaN(val)) {
    throw `Error: Invalid number given`;
  }
};

const getRestaurants = async (area, name) => {
  const myURL = new URL('https://api.yelp.com/v3/businesses/search?');
  myURL.searchParams.append('location', area);
  myURL.searchParams.append('term', name);
  myURL.searchParams.append('sort_by', 'best_match');
  myURL.searchParams.append('limit', '20');
  let url = myURL.toString().replace("+", "%20");
  const options = {
    method: 'GET',
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${APIKEY}`
    }
  };
  
  let businesses = await axios
    .request(options)
    .then(function (response) {
      return response.data.businesses;
    });
    // .catch(function (error) {
    //   console.error(error);
    // });
    return businesses;
}

const getRestaurantsQuiz = async (area, sort_by, limit, price, open_now, radius, categories) => {
  const myURL = new URL('https://api.yelp.com/v3/businesses/search?');
  myURL.searchParams.append('location', area);
  myURL.searchParams.append('term', "restaurants");
  myURL.searchParams.append('radius', radius);
  myURL.searchParams.append('categories', categories);
  for (let i = 0; i < price.length; i++) {
    myURL.searchParams.append('price', price[i]);
  }
  myURL.searchParams.append('open_now', open_now);
  myURL.searchParams.append('sort_by', sort_by);
  myURL.searchParams.append('limit', limit);
  let url = myURL.toString().replace("+", "%20");
  const options = {
    method: 'GET',
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${APIKEY}`
    }
  };
  
  let businesses = await axios
    .request(options)
    .then(function (response) {
      return response.data.businesses;
    });
    // .catch(function (error) {
    //   console.error(error);
    // });
    return businesses;
}

const getRestaurantById = async (id) => {
  const options = {
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${APIKEY}`
    }
  };
  
  let business = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    });
    // .catch(function (error) {
    //   console.error(error);
    // });
    return business;
};

export {
  getRestaurants, getRestaurantById,
  checkIsProperNumber,
  checkIsProperString,
  getRestaurantsQuiz
};
