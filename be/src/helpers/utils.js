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
  const endTimeLocal = getEndDate(date);
  return {
    date: endTimeLocal.format(DATE_FORMAT),
    timezone: endTimeLocal.format(TIME_ZONE_FORMAT)
  };
};

export const getEndDate = (date = null) => {
  const now = date ? moment(date) : moment();
  const dateValue = now.format(DATE_FORMAT);
  const timezone = now.format(TIME_ZONE_FORMAT);
  const timeValue = date ? now.format(TIME_FORMAT) : DEFAULT_TIME_VALUE;
  // const timeValue = DEFAULT_TIME_VALUE;
  const endTimeLocal = moment(
    `${dateValue} ${timeValue}${timezone}`,
    DATE_TIME_FORMAT
  );

  return endTimeLocal;
};
