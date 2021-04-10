const { questionOne, questionTwo } = require('./index');

test('question one', () => {
  expect(questionOne()).toBe('2020-01-01T00:15:00.000Z');
});

test('question two', () => {
  expect(questionTwo()).toBe('2020-01-01T04:45:00.000Z');
});
