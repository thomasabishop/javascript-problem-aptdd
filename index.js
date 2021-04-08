const lib = require('./src/lib');

function solveProblem() {
  const workers = lib.retrieveInputData('./src/data/input.txt', 'utf-8');

  let intervals = lib
    .parseIntervals(workers)
    .map((x) => x.split(','))
    .reduce((a, b) => a.concat(b));

  const startTimes = [];
  const endTimes = [];

  for (const interval of intervals) {
    lib.splitIntervals(interval, startTimes, endTimes);
  }

  const questionOne = lib.convertDateAndSort(startTimes, 'earliest');
  const questionTwo = lib.convertDateAndSort(endTimes, 'latest');

  return [questionOne, questionTwo];
}

console.log(solveProblem());
