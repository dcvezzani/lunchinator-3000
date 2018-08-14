import moment from "moment";
import {
  DEFAULT_TIME_VALUE,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  TIME_ZONE_FORMAT
} from "../constants";

export const formatTime = date => {
  return moment(date)
    .utc()
    .format("YYYY-MM-DD HH:mm:SS");
};

export const getEndDateFormatted = (date = null) => {
  const endTimeLocal = getEndDate(date).toDate();
  return formatTime(endTimeLocal);
};

export const getEndDateParts = (date = null) => {
  const now = date ? moment(date) : moment();

  return {
    date: now.format(DATE_FORMAT),
    time: date ? now.format(TIME_FORMAT) : DEFAULT_TIME_VALUE,
    timezone: now.format(TIME_ZONE_FORMAT)
  };
};

export const getEndDate = (dateValue = null) => {
  const { date, time, timezone } = getEndDateParts(dateValue);
  return moment(`${date} ${time}${timezone}`, DATE_TIME_FORMAT);
};
