import {
  getVotes,
  createBallot as generateBallot,
  getBallots,
  getBallot as fetchBallot
} from "./models";
import { formatTime } from "./utils";

export const someEndpoint = (req, res, next) => {
  res.render("index", { title: "Express" });
};
export const createBallot = (req, res, next) => {
  const endTime = formatTime(new Date());
  generateBallot(endTime, (err, obj) => {
    res.json(obj);
  });
};
export const getBallot = (req, res, next) => {
  fetchBallot(req.params.id, (err, obj) => {
    console.log("obj", obj);
    res.json(obj);
  });
};
export const castVote = (req, res, next) => {
  res.render("index", { title: "Express" });
};
