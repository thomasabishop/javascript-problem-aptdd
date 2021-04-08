const fs = require('fs');

/* Return input data synchronously as stream, split stream by newline to return array
 * @param {string} file - The file to retrieve
 * @param {string} format - Specify char encoding
 */

function retrieveInputData(file, format) {
  let data = fs.readFileSync(file, format);
  data = data.split(/\r?\n/);
  return data;
}

/* Extract interval string from input data, return as array
 * @param {array} arr - The raw filestream array
 */

function parseIntervals(arr) {
  const stripBrackets = (str) => str.toString().replace(/[\[\]']+/g, '');
  const extractIntervalString = arr.map((x) => x.match(/\[(.*?)\]/g));
  let store = [];
  for (const interval of extractIntervalString) {
    store.push(stripBrackets(interval));
  }
  return store;
}

/* For each interval, partition into respective start and end arrays
 * @param {string} interval - the interval valus
 * @param {array} start - store for start values
 * @param {string} end - store for end values
 * */
function splitIntervals(interval, startArr, endArr) {
  const divideInterval = (interval) => interval.split('/');
  const [start, end] = divideInterval(interval);
  startArr.push(start);
  endArr.push(end);
}

/* Take array of ISO dates and convert to JS dates, sort ascend/descend and return earliest/ latest
 * @param {array} arr - The array to process
 * @param {string} sortRule - Specify temporality for sort
 */

function convertDateAndSort(arr, sortRule) {
  if (Array.isArray(arr) && arr.length) {
    let jsDates = arr.map((element) => new Date(element));
    if (sortRule === 'earliest') {
      jsDates = jsDates.sort((a, b) => a - b);
    } else {
      jsDates = jsDates.sort((a, b) => b - a);
    }
    return jsDates[0];
  } else {
    throw 'Exception: ensure first argument equals non-empty array.';
  }
}

module.exports = {
  retrieveInputData,
  parseIntervals,
  splitIntervals,
  convertDateAndSort,
};
