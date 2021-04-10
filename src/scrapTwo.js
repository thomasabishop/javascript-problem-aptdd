const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const intervals = [
  '2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00',
  '2020-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00',
  '2020-01-01T16:15:00.000+12:00/2019-12-31T18:30:00.000-10:00',
  '2020-01-01T02:15:00.000+02:00/2020-01-01T13:30:00.000+12:00',
  '2020-01-01T09:00:00.000+07:00/2020-01-01T00:30:00.000-03:00',
  '2020-01-01T11:00:00.000+09:00/2020-01-01T00:30:00.000-03:00',
  '2019-12-31T19:00:00.000-09:00/2019-12-31T22:45:00.000-06:00',
  '2020-01-01T08:45:00.000+08:00/2019-12-31T14:15:00.000-11:00',
];

function splitIntervals(int) {
  const divideInterval = (interval) => interval.split('/');
  let [start, end] = divideInterval(int);
  start = new Date(start);
  end = new Date(end);

  return {
    start: start,
    end: end,
  };
}

let store = intervals.map((x) => splitIntervals(x));

let momentRanges = store.map((x) => moment.range(x.start, x.end));

//console.log(momentRanges[0].overlaps(momentRanges[2]));

//console.log(momentRanges);

const overlapStore = [];
function indentifyOverlaps(momentArr) {
  for (let i = 0; i < momentArr.length; i++) {
    let running = momentArr.length - i;
    if (running === 1) {
      momentArr.shift();
      break;
    }
    //overlapStore.push([momentArr[0].overlaps(momentArr[i + 1])]);
    overlapStore.push({
      doesOverlap: momentArr[0].overlaps(momentArr[i + 1]),
      intervals: [momentArr[0], momentArr[i + 1]],
      intersection: [momentArr[0].intersect(momentArr[i + 1])],
    });
  }
  return momentArr;
}

while (momentRanges.length > 1) {
  indentifyOverlaps(momentRanges);
}

//console.log(overlapStore);

// for (const overlap of overlapStore) {
//   const intersectStore = [];
//   if (overlap.doesOverlap) {
//     console.log(overlap.intersection[0]);
//   }
//   console.log(intersectStore);
//   // console.log(intersectStore.reduce((a, b) => a.concat(b)));
// }

let trueMatches = overlapStore.filter((x) => x.doesOverlap === true);
let trueMatchesTimes = trueMatches
  .map((x) => x.intersection)
  .reduce((a, b) => a.concat(b));
console.log(trueMatchesTimes);

// Recursively compare each element of array
let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let recStore = [];
function shiftFilter(arr) {
  for (let i = 0; i < arr.length; i++) {
    let running = arr.length - i;
    if (running === 1) {
      arr.shift();
      break;
    }
    recStore.push([arr[0], arr[i + 1]]);
  }
  return arr;
}

while (arr.length > 1) {
  shiftFilter(arr);
}
