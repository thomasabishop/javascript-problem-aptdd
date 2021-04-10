const fs = require('fs');

// Retreive input data as stream
function retrieveInputData(file, format) {
  let data = fs.readFileSync(file, format);
  data = data.split(/\r?\n/);
  return data;
}
const intervals = retrieveInputData('./data/test-data.txt', 'utf-8');

function parseDateSubstrings(arr) {
  const stripBrackets = (str) => str.replace(/[\[\]']+/g, '');
  const substrings = arr.map((element) => element.match(/\[(.*?)\]/g));
  let store = [];
  for (const substring of substrings) {
    //store.push(stripBrackets(substring[0]));
    store.push(substring[0]);
  }
  return store;
}

const rawDates = parseDateSubstrings(intervals);

function returnJsDate(dates) {
  let parseIntervalRegex = /[\,/]+/;
  let test = dates
    .map((x) => x.split(parseIntervalRegex))
    .reduce((a, b) => a.concat(b));
  let stripped = test.map((ele) => ele.substring(0, ele.lastIndexOf('.')));
  let jsFormat = stripped.map((x) => new Date(x));
  return jsFormat.map((x) => x.toISOString());
}

let experi = parseDateSubstrings(intervals)[0];

const stripBrackets = (str) => str.replace(/[\[\]']+/g, '');

experi = stripBrackets(experi);
experi = experi.split(',');

//console.log(experi);
//console.log(rawDates);
//const divideInterval = experi[0].split('/');

const divideInterval = (interval) => interval.split('/');

const [start, end] = divideInterval(experi[0]);
//console.log(end);

//('2020-01-01T08:45:00.000+08:00/2019-12-31T14:15:00.000-11:00');

//let d = new Date('2020-01-01T08:45:00.000+08:00');

let manualStartDates = [
  '2019-12-31T23:45:00.000-03:00',
  '2020-01-01T07:15:00.000+07:00',
  '2020-01-01T16:15:00.000+12:00',
  '2020-01-01T02:15:00.000+02:00',
  '2020-01-01T09:00:00.000+07:00',
  '2020-01-01T11:00:00.000+09:00',
  '2019-12-31T19:00:00.000-09:00',
  '2020-01-01T08:45:00.000+08:00',
];

let manualEndDates = [
  '2020-01-01T10:30:00.000+06:00',
  '2019-12-31T16:00:00.000-10:00',
  '2019-12-31T18:30:00.000-10:00',
  '2020-01-01T13:30:00.000+12:00',
  '2020-01-01T00:30:00.000-03:00',
  '2020-01-01T00:30:00.000-03:00',
  '2019-12-31T22:45:00.000-06:00',
  '2019-12-31T14:15:00.000-11:00',
];

// Take array of ISO dates and convert to JS dates, sort ascend/descend
function convert(arr, sortRule) {
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
