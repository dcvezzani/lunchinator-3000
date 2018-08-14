import { createBallot, getBallot } from './helpers/internalApi';
import { prepareBallotsForCreateBallot, prepareBallotsForGetBallot } from './helpers/models';
import { getBallots } from '../src/helpers/models';
import faker from 'faker';
import { formatTime } from '../src/helpers/utils';
import moment from 'moment';

describe("internal api", () => {

  describe("create ballots", () => {

    beforeAll(() => {
      return prepareBallotsForCreateBallot();
    });

    test('should create 1 new ballot', done => {
      createBallot((err, res) => {
        expect(err).toBeNull();
        const rePayload = new RegExp(`{"guid":"[^"]+"}`);
        expect(res).toMatch(rePayload);

        getBallots((err, rows) => {
          expect(rows).not.toBeNull();
          expect(rows.length).toBe(1);
          done();
        });
      });
    });
  });
  
  describe("fetch ballot", () => {
    const guid = faker.random.uuid();
    const endTime = formatTime(moment());
    const ballotRecord = {guid, endTime };

    beforeAll(() => {
      return prepareBallotsForGetBallot(ballotRecord);
    });

    test('should fetch 1 existing ballot', done => {
      getBallot(guid, (err, res) => {
        const ballot = JSON.parse(res);
        expect(ballot.guid).toBe(guid);
        expect(ballot.endTime).toBe(endTime);
        done();
      });
    });
  });

});

