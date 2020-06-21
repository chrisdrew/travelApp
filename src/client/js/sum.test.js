const {getCity} = require('./api');

describe("testing if function is a valid function",()=>{
    test("function is true ", () => {
        expect(typeof getCity).toBe("function");
    });
});