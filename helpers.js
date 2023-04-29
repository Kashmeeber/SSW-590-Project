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
  const myURL =new URL('https://api.yelp.com/v3/businesses/search?');
  myURL.searchParams.append('location', area);
  myURL.searchParams.append('term', name);
  myURL.searchParams.append('sort_by', 'best_match');
  myURL.searchParams.append('limit', '20');
  const options = {
    method: 'GET',
    url: myURL,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${APIKEY}`
    }
  };
  
  let businesses = await axios
    .request(options)
    .then(function (response) {
      return response.data.businesses;
    })
    .catch(function (error) {
      console.error(error);
    });
    return businesses;
}

const getLocation = async (searchTerms) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search?location=Hoboken',
      params: searchTerms,
      headers: {
        Authorization: `Bearer ${APIKEY}`
      }
    };
    await axios.request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.data);
      return response.data;
    });
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

export {
  getRestaurants, getRestaurantById,
  checkIsProperNumber,
  checkIsProperString,
  getLocation
};
