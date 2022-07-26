import InsightlyJS from '../src/InsightlyJS';
const dotenv = require("dotenv");

const env = dotenv.config().parsed;
const API_KEY = env?.INSIGHTLY_API_KEY;
const API_URL = env?.INSIGHTLY_API_URL;

jest.setTimeout(30000);

describe('ActivitySet', () => {
    let insightly: InsightlyJS;

    beforeAll(async () => {

        if (!API_KEY || !API_URL) {
            throw new Error('INSIGHTLY_API_KEY and INSIGHTLY_API_URL are not set');
        }

        insightly = new InsightlyJS({
            apiKey: API_KEY, 
            apiUrl: API_URL
        });
    });

    let activitySetId: number;

    describe('getActivitySetList', () => {
        it('should be defined', () => {
            expect(insightly.getActivitySetList).toBeDefined();
        });

        it('should return a list of activity sets', async () => {
            const activitySets = await insightly.getActivitySetList();
            expect(activitySets).toBeDefined();
            expect(activitySets.length).toBeGreaterThan(0);
            activitySetId = activitySets[0].ACTIVITYSET_ID;
        });

    });

    describe("getActivitySet", () => {
        it("should be defined", () => {
            expect(insightly.getActivitySet).toBeDefined();
        });

        it("should be a function", () => {
            expect(typeof insightly.getActivitySet).toBe("function");
        });

        it("should return an activity set", async () => {
            const activitySet = await insightly.getActivitySet(activitySetId);
            expect(activitySet).toBeDefined();
            expect(typeof activitySet).toBe('object');
        });

        it("should reject an empty input", async () => {
            //@ts-ignore
            await expect(insightly.getActivitySet()).rejects.toThrow();
        });
    });
});
