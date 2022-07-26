export default {
    /**
     * Define a global variable to hold the fetch definition.
     * If there is no fetch definition, then it will be polyfilled
     * in the runtimeIsCompatible function
     *
     * @see /src/utils/runtimeIsCompatible.ts
     */
    fetch: (fetch || window.fetch || undefined) as any,
};
