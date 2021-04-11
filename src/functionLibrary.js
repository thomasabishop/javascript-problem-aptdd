const fs = require('fs');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

/* Return input data as synchronous stream, split stream by newline to return array
 * @param {string} file - The file to retrieve
 * @param {string} format - Character encoding
 */

function retrieveInputData(file, format) {
  let data = fs.readFileSync(file, format);
  data = data.split(/\r\n|\r|\n/);
  return data;
}

/* Extract interval strings from input data, return each string as array element
 * @param {array} workerList - File stream array
 */

function extractIntervals(workerList) {
  const parsed = workerList
    .map((x) => x.match(/\[(.*?)\]/g))
    .toString()
    .replace(/[\[\]']+/g, '');
  return parsed.split(',');
}

/* For each interval in array of string intervals, partition into object with start and end times distinguished, converted from ISO format to JS Date object.
 * @param {string} interval - the interval string to be partitioned
 */

function partitionIntervals(interval) {
  const divideInterval = (x) => x.split('/');
  let [start, end] = divideInterval(interval);
  start = new Date(start);
  end = new Date(end);
  return {
    start: start,
    end: end,
  };
}

module.exports = {
  retrieveInputData,
  extractIntervals,
  partitionIntervals,
};
