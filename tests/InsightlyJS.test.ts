import InsightlyJS from '../src/InsightlyJS';

describe("InsightlyJS", () => {
    it("should be defined", () => {
        expect(InsightlyJS).toBeDefined();
    });

    it("should be a class", () => {
        expect(typeof InsightlyJS).toBe('function');
    });
});