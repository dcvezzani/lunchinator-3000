import db from "../db";
const uuidv1 = require("uuid/v1");

export const getVotes = (guid, callback) => {
  db("votes")
    .select()
    .where({ ballotGuid: guid })
    .asCallback((err, rows) => {
      if (err)
        return callback({
          msg: "Unable to fetch records",
          raw: err.toString()
        });
      callback(err, rows);
    });
};

export const getBallot = (guid, callback) => {
  db("ballots")
    .select()
    .where({ guid })
    .asCallback((err, rows) => {
      if (err)
        return callback({
          msg: "Unable to fetch records",
          raw: err.toString()
        });
      callback(err, rows);
    });
};

export const getBallots = callback => {
  db("ballots")
    .select()
    .asCallback((err, rows) => {
      if (err)
        return callback({
          msg: "Unable to fetch records",
          raw: err.toString()
        });
      callback(err, rows);
    });
};

export const createBallot = (endTime, callback) => {
  const guid = uuidv1();
  db("ballots")
    .insert({ guid, endTime })
    .asCallback(err => {
      if (err)
        return callback({
          msg: "Unable to insert records",
          raw: err.toString()
        });
      callback(err, { guid });
    });
};
