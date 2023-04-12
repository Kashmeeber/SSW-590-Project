import { Router } from 'express';
const router = Router();
import { getRestaurants, getRestaurantById } from '../helpers.js';
import { restaurants } from '../config/mongoCollections.js';

// homepage : includes a search for restaurants and tabs at the top
router.route('/').get(async (req, res) => {
  //code here for GET
  return res.render('../views/homepage', { title: 'Food Me Please' });
});

// search results page
router.route('/restaurantResults').post(async (req, res) => {
  //code here for POST
  if (!req.body.searchRestaurant || req.body.searchRestaurant.trim() === '') {
    return res.status(400).render('../views/error', {
      title: 'Error: 400',
      error: 'Error 400: No input text was given into the form.'
    });
  }
  try {
    let ob = await getRestaurants(req.body.searchRestaurant);
    let venues = ob._embedded.venues;
    return res.render('../views/restaurantSearchResults', {
      title: 'Restaurants Found',
      searchRestaurant: req.body.searchRestaurant,
      venues: venues
    });
  } catch (e) {
    return res.status(404).render('../views/restaurantNotFound', {
      title: 'Error 404',
      searchRestaurant: req.body.searchRestaurant
    });
  }
});

// restaurant quiz page
router.route('/restaurantQuiz').get(async (req, res) => {
  //code here for GET
  return res.render('../views/quiz', { title: 'Restaurant Quiz' });
});

// restaurant details page
router.route('/restaurantDetails/:id').get(async (req, res) => {
  if (!req.params.id || req.params.id.trim() === '') {
    return res.status(404).render('../views/error', {
      title: 'Error 404',
      error: 'Error 404: A restaurant with the given id does not exist.'
    });
  }
  try {
    let restaurant = await getRestaurantById(req.params.id);
    let name = 'N/A';
    if (Object.keys(restaurant).includes('name')) {
      name = restaurant.name;
      if (name.trim() === '' || !name) {
        name = 'N/A';
      }
    }
    return res.render('../views/restaurantDetails', {
      title: 'Restaurant Details',
      name: name,
      restaurant: restaurant
    });
  } catch (e) {
    return res.status(404).render('../views/error', {
      title: 'Error 404',
      error: 'Error 404: A restaurant with the given id does not exist.'
    });
  }
});

// router.route('/restaurantDetails/:id').get(async (req, res) => {
//code here for GET
// if (!req.params.id || req.params.id.trim() === '') {
//   return res.status(404).render('../views/error', {
//     title: 'Error 404',
//     error: 'Error 404: A restaurant with the given id does not exist.'
//   });
// }
// try {
//   let venue = await getRestaurantById(req.params.id);
//   let name = 'N/A';
//   if (Object.keys(venue).includes('name')) {
//     name = restaurants.name;
//     if (name.trim() === '' || !name) {
//       name = 'N/A';
//     }
//   }

//   let src = null;
//   if (Object.keys(venue).includes('images')) {
//     src = restaurants.images[0].url;
//     if (src.trim() === '' || !src) {
//       src = null;
//     }
//   }
//   let website = null;
//   if (Object.keys(venue).includes('url')) {
//     website = restaurants.url;
//     if (website.trim() === '' || !website) {
//       website = null;
//     }
//   }

//   let address1a = 'N/A';
//   if (Object.keys(venue).includes('address') && Object.keys(venue.address).includes('line1')) {
//     address1a = restaurants.address.line1;
//     if (address1a.trim() === '' || !address1a) {
//       address1a = 'N/A';
//     }
//   }

//   let address1b = 'N/A';
//   if (Object.keys(venue).includes('city') && Object.keys(venue.city).includes('name')) {
//     address1b = restaurants.city.name;
//     if (address1b.trim() === '' || !address1b) {
//       address1b = 'N/A';
//     }
//   }

//   let address1c = 'N/A';
//   if (Object.keys(venue).includes('state') && Object.keys(venue.state).includes('stateCode')) {
//     address1c = venue.state.stateCode;
//     if (address1c.trim() === '' || !address1c) {
//       address1c = 'N/A';
//     }
//   }

//   let address1d = 'N/A';
//   if (Object.keys(venue).includes('postalCode')) {
//     address1d = venue.postalCode;
//     if (address1d.trim() === '' || !address1d) {
//       address1d = 'N/A';
//     }
//   }

//   let address1 = `${address1a}, ${address1b}, ${address1c}, ${address1d}`;

//   let address2 = 'N/A';
//   if (
//     Object.keys(venue).includes('boxOfficeInfo') &&
//     Object.keys(venue.boxOfficeInfo).includes('phoneNumberDetail')
//   ) {
//     address2 = venue.boxOfficeInfo.phoneNumberDetail;
//     if (address2.trim() === '' || !address2) {
//       address2 = 'N/A';
//     }
//   }

//   return res.render('../views/venueByID', {
//     title: 'Venue Details',
//     name: name,
//     src: src,
//     website: website,
//     address1: address1,
//     address2: address2
//   });
// } catch (e) {
//   return res.status(404).render('../views/error', {
//     title: 'Error 404',
//     error: 'Error 404: A venue with the given id does not exist.'
//   });
// }
// });

export default router;
