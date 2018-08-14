import db from "../../src/db";
import faker from "faker";
import _ from "lodash";
import moment from "moment";

export const prepareVotes = (guid, cnt) => {
  const voteRecords = _.range(cnt).map(idx => ({
    ballotId: guid,
    emailAddress: faker.internet.email(),
    name: faker.name.firstName(),
    restaurantId: faker.random.number()
  }));

  return db("votes")
    .del()
    .then(() => {
      return db("votes").insert(voteRecords);
    });
};

export const prepareBallots = (guid, cnt) => {
  let offsetCnt = 0;
  const endTime = dayOffset =>
    moment()
      .add(dayOffset, "d")
      .utc()
      .format("YYYY-MM-DD HH:mm:SS");
  const ballotRecords = _.range(cnt).map(idx => ({
    guid: faker.random.uuid(),
    endTime: endTime(offsetCnt++)
  }));
  ballotRecords[0].guid = guid;

  return db("ballots")
    .del()
    .then(() => {
      return db("ballots").insert(ballotRecords);
    });
};

export const prepareBallotsForCreateBallot = () => {
  return db("ballots").del();
};

export const prepareBallotsForGetBallot = ballotRecord => {
  return db("ballots")
    .del()
    .then(() => {
      return db("ballots").insert(ballotRecord);
    });
};

export const prepareVotesForCastVote = ballotRecord => {
  return db("votes")
    .del()
    .then(() => {
      return db("ballots").del();
    })
    .then(() => {
      return db("ballots").insert(ballotRecord);
    });
};
