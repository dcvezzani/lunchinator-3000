import {
  createBallot as dbCreateBallot,
  getBallot as dbGetBallot,
  castVote as dbCastVote
} from "./models";
import { formatTime, getEndDateFormatted } from "./utils";
import { getRestaurants } from "./externalApi";
import moment from "moment";
import _ from "lodash";
import { getCache } from "../cache";

let cache = {};
getCache((err, cachedRecords) => {
  if (err) return console.error("Unable to cache external records", err);
  cache = cachedRecords;
  console.log("Cache accessed", Object.keys(cache));
});

export const createBallot = (req, res, next) => {
  // todo: fetch endDate from req.body
  const endTime = getEndDateFormatted();
  dbCreateBallot({ endTime, ...req.body }, (err, obj) => {
    res.json(obj);
  });
};
export const getBallot = (req, res, next) => {
  dbGetBallot(req.params.id, (err, ballot) => {
    const ballotEndTime = moment(ballot.endTime);
    const currentTime = moment();

    // if (currentTime > ballotEndTime) return getFinishedBallot(req, res, next);
    getActiveBallot(req, res, next);
  });
};
export const getActiveBallot = (req, res, next) => {
  const shuffledRestaurants = _.shuffle(cache.choices).slice(0, 5);
  let suggestion = null;

  shuffledRestaurants.forEach(restaurant => {
    if (
      !suggestion ||
      parseInt(restaurant.averageReview) > suggestion.averageReview
    )
      suggestion = {
        ...restaurant,
        averageReview: parseInt(restaurant.averageReview)
      };
  });

  suggestion.averageReview = suggestion.averageReview.toString();
  res.json({ ballot: "active", suggestion, choices: shuffledRestaurants });
};
export const getFinishedBallot = (req, res, next) => {
  res.json({ ballot: "expired" });
};

export const castVote = (req, res, next) => {
  const voterName = req.query.voterName;
  delete req.query.voterName;
  dbCastVote({ ...req.query, name: voterName }, (err, obj) => {
    res.sendStatus(200);
  });
};
