import buildUrlParams from '../src/utils/buildUrlParams';

describe('buildUrlParams', () => {
    it('should be defined', () => {
        expect(buildUrlParams).toBeDefined();
    });

    it('should be a function', () => {
        expect(typeof buildUrlParams).toBe('function');
    });

    it('should return a string with valid params', () => {
        expect(buildUrlParams({ a: 'b' })).toBe('?a=b');
    });

    it('should omit a false key', () => {
        expect(buildUrlParams({ false: 'b' })).toBe('');
    });

    it('should omit a falsy key', () => {
        expect(buildUrlParams({ null: 'b' })).toBe('');
    });

    it('should return a string with multiple parameters', () => {
        expect(buildUrlParams({ a: 'b' }, { c: 'd' })).toBe('?a=b&c=d');
    });

    it("should return a parameterized string for both pairs", () => {
        expect(buildUrlParams({ a: 'b' }, { c: false })).toBe('?a=b&c=false');
    });

    it("should return a parameterized string for the first pair", () => {
        expect(buildUrlParams({ a: 'b' }, { false: 'd' })).toBe('?a=b');
    });

    it("should return a parameterized string for the second pair", () => {
        expect(buildUrlParams({ false: 'b' }, { c: 'd' })).toBe('?c=d');
    });

    it("should reject a falsy value (except zero and false)", () => {
        expect(buildUrlParams({ c: null })).toBe('');
        expect(buildUrlParams({ c: undefined })).toBe('');
        expect(buildUrlParams({ c: NaN })).toBe('');
    });
});
