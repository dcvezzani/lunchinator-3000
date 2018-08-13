var express = require("express");
var router = express.Router();
import moment from "moment";
import {
  someEndpoint,
  createBallot,
  getBallot,
  castVote
} from "../src/helpers/internalApi";

/* GET home page. */
router.get("/", someEndpoint);
router.post("/create-ballot", createBallot);
router.get("/ballot/:id", getBallot);
router.post("/vote", castVote);

module.exports = router;
