import InsightlyHTTPRequest from '../src/utils/http';
const dotenv = require("dotenv");

const env = dotenv.config().parsed;
const API_KEY = env?.INSIGHTLY_API_KEY;
const API_URL = env?.INSIGHTLY_API_URL;

describe("countTotal", () => {
    // the countTotal option is the same for all calls, as long as the boolean is passed in to InsightlyHTTPRequest

    it("should return the total amount of records as a number", async () => {
        const request = new InsightlyHTTPRequest(API_KEY, API_URL, true);
        const req = await request.get("/Contacts?brief=true");
        expect(typeof req).toBe("number");
    });
});