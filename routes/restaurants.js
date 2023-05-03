import { Router } from 'express';
const router = Router();
import {  getRestaurants, getRestaurantById, getRestaurantsQuiz } from '../helpers.js';

// homepage : includes a search for restaurants and tabs at the top
router.route('/').get(async (req, res) => {
  //code here for GET
  return res.render('../views/homepage', { title: 'Food Me Please' });
});

// search results page
router.route('/restaurantResults').post(async (req, res) => {
  //code here for POST
  if (
    !req.body.searchName || 
    req.body.searchName.trim() === '' ||
    !req.body.searchLocation ||
    req.body.searchLocation.trim() === ''
  ) {
    return res.status(400).render('../views/homepage', {
      title: 'Error 400',
      error: 'Error 400: Missing search term.'
    });
  }
  try {
    let restaurants = await getRestaurants(req.body.searchLocation, req.body.searchName);
    return res.render('../views/restaurantSearchResults', {
      title: "Here's What We Found...",
      searchLocation: req.body.searchName,
      restaurants: restaurants
    });
  } catch (e) {
    return res.status(404).render('../views/error', {
      title: 'Error 404',
      error: e
    });
  }
});

// restaurant quiz page
router.route('/restaurantQuiz').get(async (req, res) => {
  //code here for GET
  return res.render('../views/quiz', { title: 'Restaurant Quiz' });
});

// restaurant quiz results page
router.route('/restaurantQuizResults').post(async (req, res) => {
  if (!req.body.cuisine || !req.body.price || !req.body.location || !req.body.distance || !req.body.open || !req.body.numOptions || !req.body.sort_by ||
    req.body.cuisine.trim() === '' || req.body.location.trim() === '') {
      return res.status(400).render('../views/quiz', {
        title: 'Error 400',
        error: 'Error 400: Missing inputs given'
      })
  } 
  if ( req.body.distance < 0 ) {
    return res.status(400).render('../views/quiz', {
      title: 'Error 400',
      error: 'Error 400: Distance must be greater than 0'
    });
  }
  if (req.body.numOptions < 0 || req.body.numOptions > 50) {
    return res.status(400).render('../views/quiz', {
      title: 'Error 400',
      error: 'Error 400: The number of options to be displayed must be between 0 and 50.'
    });
  }
  let cuisine = req.body.cuisine.trim();
  let price = req.body.price;
  let location = req.body.location.trim();
  let distance = req.body.distance * 1609.34;
  distance = distance.toFixed(0);
  let open = req.body.open;
  let numOptions = req.body.numOptions;
  let sort_by = req.body.sort_by;
  try {
    let restaurants = await getRestaurantsQuiz(location, sort_by, numOptions, price, open, distance, cuisine);
    return res.render('../views/restaurantQuizResults', {
      title: "Here's What We Found...",
      searchName: req.body.searchName,
      restaurants: restaurants
    });
  } catch (e) {
    return res.status(404).render('../views/error', {
      title: 'Error 404',
      error: 'Error 404: A restaurant with the given id does not exist.'
    });
  }
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

    let image = null;
    if (Object.keys(restaurant).includes('image_url')) {
      image = restaurant.image_url;
      if (image.trim() === '' || !image) {
        image = null;
      }
    }

    let website = 'N/A';
    if (Object.keys(restaurant).includes('url')) {
      website = restaurant.url;
      if (website.trim() === '' || !website) {
        website = 'N/A';
      }
    }

    let price = 'N/A';
    if (Object.keys(restaurant).includes('price')) {
      price = restaurant.price;
      if (price.trim() === '' || !price) {
        price = 'N/A';
      }
    }

    let address = 'N/A';
    let address2 = 'N/A;'
    if (Object.keys(restaurant).includes('location') && Object.keys(restaurant.location).includes('display_address')) {
      address = restaurant.location.display_address[0];
      if (restaurant.location.display_address.length > 1) {
        address2 = restaurant.location.display_address[1];
      }
      if (address.trim() === '' || !address) {
        address = 'N/A';
      }
      if (address2.trim() === '' || !address2) {
        address2 = 'N/A';
      }
    }

    let phone = 'N/A';
    if (Object.keys(restaurant).includes('display_phone')) {
      phone = restaurant.display_phone;
      if (phone.trim() === '' || !phone) {
        phone = 'N/A';
      }
    }

    let rating = 'N/A';
    let rating_image = null;
    if (Object.keys(restaurant).includes('rating')) {
      rating = restaurant.rating;
    }
    if (rating === "N/A") {
      rating_image = '../public/images/No_Image_Available.jpg'
    } else if (rating === 0) {
      rating_image = '../public/images/regular/regular_0.png'
    } else if (rating === 1) {
      rating_image = '../public/images/regular/regular_1.png'
    } else if (rating === 1.5) {
      rating_image = '../public/images/regular/regular_1_half.png'
    } else if (rating === 2) {
      rating_image = '../public/images/regular/regular_2.png'
    } else if (rating === 2.5) {
      rating_image = '../public/images/regular/regular_2_half.png'
    } else if (rating === 3) {
      rating_image = '../public/images/regular/regular_3.png'
    } else if (rating === 3.5) {
      rating_image = '../public/images/regular/regular_3_half.png'
    } else if (rating === 4) {
      rating_image = '../public/images/regular/regular_4.png'
    } else if (rating === 4.5) {
      rating_image = '../public/images/regular/regular_4_half.png'
    } else if (rating === 5) {
      rating_image = '../public/images/regular/regular_5.png'
    }
    
    let is_closed = 'N/A';
    if (Object.keys(restaurant).includes('is_closed')) {
      is_closed = restaurant.is_closed;
    }

    if (is_closed === false) {
      is_closed = "Currently Open";
    } else { 
      is_closed = "Currently Closed";
    }
    
    return res.render('../views/restaurantByID', {
      title: 'Restaurant Details',
      name: name,
      image: image, 
      website: website,
      address: address,
      address2: address2,
      phone: phone,
      price: price,
      rating_image: rating_image,
      is_closed: is_closed
    });
  } catch (e) {
    return res.status(404).render('../views/error', {
      title: 'Error 404',
      error: 'Error 404: A restaurant with the given id does not exist.'
    });
  }
});

export default router;
