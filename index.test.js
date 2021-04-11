const lib = require('./src/functionLibrary');
const workers = lib.retrieveInputData('./src/data/test-data.txt', 'utf-8');
const intervalsStringArray = lib.extractIntervals(workers);
const intervalsObjectArray = intervalsStringArray.map((x) =>
  lib.partitionIntervals(x)
);

function questionOne() {
  const earliestStart = () =>
    intervalsObjectArray.sort((a, b) => a.start - b.start);
  return earliestStart()[0].start.toISOString();
}

function questionTwo() {
  const latestEnd = () => intervalsObjectArray.sort((a, b) => b.end - a.end);
  return latestEnd()[0].end.toISOString();
}
test('question one', () => {
  expect(questionOne()).toBe('2020-01-01T00:15:00.000Z');
});

test('question two', () => {
  expect(questionTwo()).toBe('2020-01-01T04:45:00.000Z');
});
