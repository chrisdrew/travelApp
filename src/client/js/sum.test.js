const {printResult} = require('./api');

describe('Check and see if function is alive', () => {
  test('Return true', () => {
    expect(printResult).toBeDefined();
  });
});

