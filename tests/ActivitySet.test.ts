import InsightlyJS from '../src/InsightlyJS';
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

const API_KEY = env?.INSIGHTLY_API_KEY;
const API_URL = env?.INSIGHTLY_API_URL;

if (!API_KEY) {
    throw new Error('INSIGHTLY_API_KEY is not set');
}

jest.setTimeout(30000);

describe('ActivitySet', () => {
    let insightly: InsightlyJS;

    beforeAll(async () => {
        insightly = new InsightlyJS({
            apiKey: API_KEY, 
            apiHost: API_URL
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

    // describe("getActivitySet", () => {
    //     it("should be defined", () => {
    //         expect(insightly.getActivitySet).toBeDefined();
    //     });

    //     it("should return an activity set", async () => {
    //         const activitySet = await insightly.getActivitySet(activitySetId);
    //         expect(activitySet).toBeDefined();
    //         expect(typeof activitySet).toBe('object');
    //     });
    // });
});
