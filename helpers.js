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

const getRestaurants = async (searchTerms) => {
  try {
    let { data } = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${APIKEY}`
      },
      params: searchTerms
    });
    return data;
  } catch (e) {
    if (e.code === 'ENOTFOUND') throw 'Error: Invalid URL';
    else if (e.response) throw `Error: ${e.response.status}: ${e.response.statusText}`;
    else throw `Error: ${e}`;
  }
};

const getRestaurantById = async (id) => {
  try {
    let { data } = await axios.get('https://api.yelp.com/v3/businesses/', {
      headers: {
        Authorization: `Bearer ${APIKEY}`
      },
      params: {
        id: id
      }
    });
    return data;
  } catch (e) {
    if (e.code === 'ENOTFOUND') throw 'Error: Invalid URL';
    else if (e.response) throw `Error: ${e.response.status}: ${e.response.statusText}`;
    else throw `Error: ${e}`;
  }
};

export { getRestaurants, getRestaurantById, checkIsProperNumber, checkIsProperString };
