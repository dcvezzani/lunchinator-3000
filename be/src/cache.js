import { getRestaurants, getReviews } from "./helpers/externalApi";
import async from "async";
import _ from "lodash";

const cache = {};

export const getCache = cb => {
  async.series(
    {
      fetchRestaurants: callback => {
        getRestaurants((err, restaurants) => {
          if (err) {
            cache["restaurants"] = [];
            return callback({ err, message: "Unable to load restaurants" });
          }
          cache["restaurants"] = restaurants;
          cache["restaurantsByName"] = restaurants.reduce(
            (hash, restaurant) => {
              hash[restaurant.name] = restaurant.id;
              return hash;
            },
            {}
          );
          callback();
        });
      },

      fetchReviews: callback => {
        getReviews((err, reviews) => {
          if (err) {
            cache["reviews"] = [];
            return callback({ err, message: "Unable to load reviews" });
          }
          cache["reviews"] = reviews;
          callback();
        });
      },

      createChoices: callback => {
        cache["choices"] = cache["reviews"].reduce((summary, review) => {
          if (!summary[review.restaurant]) {
            summary[review.restaurant] = {
              id: cache.restaurantsByName[review.restaurant],
              ratings: [],
              averageReview: 0,
              name: review.restaurant,
              topRating: 0,
              TopReviewer: null,
              Review: null
            };
          }

          summary[review.restaurant].ratings.push(parseInt(review.rating));
          if (review.rating > summary[review.restaurant].topRating) {
            summary[review.restaurant].topRating = review.rating;
            summary[review.restaurant].TopReviewer = review.reviewer;
            summary[review.restaurant].Review = review.review;
          }

          return summary;
        }, {});
        callback();
      },

      averageRatings: callback => {
        _.forEach(cache.choices, function(choice) {
          choice.averageReview = _.round(_.mean(choice.ratings)).toString();
        });
        callback();
      }
    },
    err => {
      if (err) {
        console.error(err);
        return cb(err);
      }
      console.log(
        `Cache loaded: ${cache.restaurants.length} restaurants, ${
          cache.reviews.length
        } reviews`
      );
      cb(null, cache);
    }
  );
};
