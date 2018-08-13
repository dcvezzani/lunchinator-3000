import {
  getVotes,
  createBallot as generateBallot,
  getBallots,
  getBallot as fetchBallot
} from "./models";

export const someEndpoint = (req, res, next) => {
  res.render("index", { title: "Express" });
};
export const createBallot = (req, res, next) => {
  res.render("index", { title: "Express" });
};
export const getBallot = (req, res, next) => {
  res.render("index", { title: "Express" });
};
export const castVote = (req, res, next) => {
  res.render("index", { title: "Express" });
};
