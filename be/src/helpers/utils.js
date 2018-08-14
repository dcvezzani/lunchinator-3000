import moment from 'moment';

export const formatTime = (date) => {
  return moment(date).utc().format('YYYY-MM-DD HH:mm:SS');
};
