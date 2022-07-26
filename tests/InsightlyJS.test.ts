import InsightlyJS from '../src/InsightlyJS';

describe('InsightlyJS', () => {
    it('should be defined', () => {
        expect(InsightlyJS).toBeDefined();
    });

    it('should be a class', () => {
        expect(typeof InsightlyJS).toBe('function');
    });

    it('should have a constructor', () => {
        expect(InsightlyJS.prototype.constructor).toBeDefined();
    });

    it("should use fetch or polyfill if it's not available", () => {
        /**
         * fetch should be polyfilled if it's not available
         * @see /src/InsightlyJS.ts
         * @see /src/utils/runtimeIsCompatible.ts
         */
        expect(new InsightlyJS({ apiKey: 'fake_api_key', apiUrl: 'fake_api_url' })).toBeInstanceOf(InsightlyJS);
    });

    it("should throw an error if an api key or api url isn't provided", () => {
        //@ts-ignore
        expect(() => new InsightlyJS({})).toThrow();
    });
});
