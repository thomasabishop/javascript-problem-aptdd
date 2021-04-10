const lib = require('./src/functionLibrary');
const workers = lib.retrieveInputData('./src/data/test-data.txt', 'utf-8');
const intervalsStringArray = lib.extractIntervals(workers);
const intervalsObjectArray = intervalsStringArray.map((x) =>
  lib.partitionIntervals(x)
);

console.log(intervalsStringArray);
console.log(intervalsObjectArray);

function questionOne() {
  const earliestStart = () =>
    intervalsObjectArray.sort((a, b) => a.start - b.start);
  return earliestStart()[0].start;
}

function questionTwo() {
  const latestEnd = () => intervalsObjectArray.sort((a, b) => b.end - a.end);
  return latestEnd()[0].end;
}

console.log(questionOne());
console.log(questionTwo());
