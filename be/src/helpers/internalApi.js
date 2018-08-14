import {
  createBallot as dbCreateBallot,
  getBallot as dbGetBallot,
  castVote as dbCastVote
} from "./models";
import { formatTime, getEndDate } from "./utils";
import moment from "moment";

export const createBallot = (req, res, next) => {
  // todo: fetch endDate from req.body
  const endTime = getEndDate();
  dbCreateBallot(endTime, (err, obj) => {
    res.json(obj);
  });
};
export const getBallot = (req, res, next) => {
  dbGetBallot(req.params.id, (err, obj) => {
    res.json(obj);
  });
};
export const castVote = (req, res, next) => {
  const voterName = req.query.voterName;
  delete req.query.voterName;
  dbCastVote({ ...req.query, name: voterName }, (err, obj) => {
    res.sendStatus(200);
  });
};
