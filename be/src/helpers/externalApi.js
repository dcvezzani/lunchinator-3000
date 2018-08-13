import request from "request";

const BASE_URL = "https://interview-project-17987.herokuapp.com/api";
const RESTAURANTS = `${BASE_URL}/restaurants`;
const REVIEWS = `${BASE_URL}/reviews`;

const fetch = (url, callback) => {
  console.log("url", url);
  var options = {
    url,
    headers: { "Content-Type": "application/json" }
  };

  request(options, callback);
};

export const getRestaurants = callback => {
  fetch(RESTAURANTS, (error, response, body) => {
    callback(error, JSON.parse(body));
  });
};

export const getRestaurant = (name, callback) => {
  const urlEncodedName = encodeURIComponent(name);
  fetch(`${RESTAURANTS}/${urlEncodedName}`, (error, response, body) => {
    callback(error, JSON.parse(body));
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  });
};

export const getReviews = callback => {
  fetch(REVIEWS, (error, response, body) => {
    callback(error, JSON.parse(body));
  });
};

export const getReview = (restaurantName, callback) => {
  const urlEncodedRestaurantName = encodeURIComponent(restaurantName);
  fetch(`${REVIEWS}/${urlEncodedRestaurantName}`, (error, response, body) => {
    callback(error, JSON.parse(body));
  });
};

// import { getRestaurants, getRestaurant, getReviews, getReview } from '../src/helpers/externalApi';
//
// getRestaurant("Five Guys", (err, restaurant) => {
//   console.log("restaurant", (typeof restaurant), restaurant);
// });
// getRestaurants((err, restaurants) => {
//   console.log("restaurants", restaurants);
// });
// getReview("Five Guys", (err, review) => {
//   console.log("review", review);
// });
// getReviews((err, reviews) => {
//   console.log("reviews", reviews);
// });
