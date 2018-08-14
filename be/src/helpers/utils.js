import moment from "moment";
import {
  DEFAULT_TIME_VALUE,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_ZONE_FORMAT
} from "../constants";

export const formatTime = date => {
  return moment(date)
    .utc()
    .format("YYYY-MM-DD HH:mm:SS");
};

export const getEndDate = (date = null) => {
  const now = moment();
  const dateValue = now.format(DATE_FORMAT);
  const timezone = now.format(TIME_ZONE_FORMAT);
  const timeValue = DEFAULT_TIME_VALUE;
  const endTimeLocal = moment(
    `${dateValue} ${timeValue}${timezone}`,
    DATE_TIME_FORMAT
  ).toDate();
  return formatTime(endTimeLocal);
};
