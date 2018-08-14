import request from "request";
// import db from '../../src/db';
// import faker from 'faker';
// import _ from 'lodash';
// import moment from 'moment';

const BASE_URL = "http://localhost:3000/api";
const CREATE_BALLOT = `${BASE_URL}/create-ballot`;
const GET_BALLOT = `${BASE_URL}/ballot/:id`;

export const api = (url, callback) => {
  console.log("url", url);
  let options = null;
  const defaultOptions = {
    headers: { "Content-Type": "application/json" }
  };

  if (typeof url === "object") options = { ...defaultOptions, ...url };
  else {
    options = { ...defaultOptions, url };
  }

  request(options, callback);
};

export const createBallot = callback => {
  const options = {
    url: CREATE_BALLOT,
    method: "POST"
  };
  api(options, (error, response, body) => {
    callback(error, body);
  });
};

// router.get("/ballot/:id", getBallot);
export const getBallot = (guid, callback) => {
  api(GET_BALLOT.replace(/:id/, guid), (error, response, body) => {
    callback(error, body);
  });
};
