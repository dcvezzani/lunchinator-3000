import db from "../db";
const uuidv1 = require("uuid/v1");

export const getVotes = (guid, callback) => {
  db("votes")
    .select()
    .where({ ballotId: guid })
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
    .first()
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

export const createBallot = ({ endTime, voters }, callback) => {
  const guid = uuidv1();

  db.transaction(function(trx) {
    db("ballots")
      .transacting(trx)
      .insert({ guid, endTime })
      .asCallback(err => {
        if (err) {
          trx.rollback();
          return callback({
            msg: "Unable to insert records",
            raw: err.toString()
          });
        }

        const votes = voters.map(voter => ({ ballot_id: guid, ...voter }));
        db("votes")
          .transacting(trx)
          .insert(votes)
          .asCallback(err => {
            if (err) {
              trx.rollback();
              return callback({
                msg: "Unable to insert records",
                raw: err.toString()
              });
            }

            trx.commit();
            callback(err, { ballotId: guid });
          });
      });
  });
};

export const castVote = (voteData, callback) => {
  db("votes")
    .insert(voteData)
    .asCallback(err => {
      if (err)
        return callback({
          msg: "Unable to insert records",
          raw: err.toString()
        });
      callback();
    });
};
