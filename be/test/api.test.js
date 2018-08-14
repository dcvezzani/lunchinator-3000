import {
  createBallot,
  getBallot,
  castVote,
  createBallotWithEndTime
} from "./helpers/internalApi";
import {
  prepareBallotsForCreateBallot,
  prepareBallotsForGetBallot,
  prepareVotesForCastVote
} from "./helpers/models";
import { getBallots, getVotes } from "../src/helpers/models";
import faker from "faker";
import {
  formatTime,
  getEndDateFormatted,
  getEndDateParts
} from "../src/helpers/utils";
import moment from "moment";
import {
  DEFAULT_TIME_VALUE,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_ZONE_FORMAT
} from "../src/constants";

describe("internal api", () => {
  describe("create ballots", () => {
    beforeEach(() => {
      return prepareBallotsForCreateBallot();
    });

    test("should create 1 new ballot", done => {
      createBallot((err, res) => {
        expect(err).toBeNull();
        const rePayload = new RegExp(`{"ballotId":"[^"]+"}`);
        expect(JSON.stringify(res)).toMatch(rePayload);

        getBallots((err, rows) => {
          expect(rows).not.toBeNull();
          expect(rows.length).toBe(1);
          done();
        });
      });
    });

    test("should new ballot with default endTime of 11:45am local time", done => {
      const endTime = getEndDateFormatted();

      createBallot((err, res) => {
        getBallots((err, rows) => {
          expect(rows[0].endTime).toBe(endTime);
          done();
        });
      });
    });

    test("should new ballot with custom endTime", done => {
      const { date, timezone } = getEndDateParts();
      const customTime = "14:30:00";
      const endTime = getEndDateFormatted(`${date} ${customTime}${timezone}`);

      createBallotWithEndTime(endTime, (err, res) => {
        getBallots((err, rows) => {
          // console.log("endTime", endTime.toString());
          expect(rows[0].endTime).toBe(endTime);
          done();
        });
      });
    });
  });

  describe("fetch ballot", () => {
    const guid = faker.random.uuid();
    const endTime = getEndDateFormatted();
    const ballotRecord = { guid, endTime };

    beforeAll(() => {
      return prepareBallotsForGetBallot(ballotRecord);
    });

    test("should fetch 1 existing ballot", done => {
      getBallot(guid, (err, res) => {
        // console.log("getBallot", res);
        const ballotChoices = JSON.parse(res);
        expect(Object.keys(ballotChoices)).toContain("choices");
        expect(Object.keys(ballotChoices)).toContain("suggestion");
        done();
      });
    });
  });

  describe("cast vote", () => {
    const guid = faker.random.uuid();
    const voterName = faker.name.firstName();
    const emailAddress = faker.internet.email();
    const endTime = getEndDateFormatted();
    const ballotRecord = { guid, endTime };
    const restaurantId = faker.random.number();
    const voteRecord = {
      id: restaurantId,
      ballotId: guid,
      voterName,
      emailAddress
    };

    beforeAll(() => {
      return prepareVotesForCastVote(ballotRecord);
    });

    test("should record 1 vote", done => {
      castVote(voteRecord, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toBe("OK");

        getVotes(guid, (err, rows) => {
          expect(rows.length).toBe(1);
          done();
        });
      });
    });
  });
});
