import global from '../globalVars';

// polyfill fetch for node or browsers that don't support it

async function runtimeIsCompatible() {
    try {
        if (typeof fetch === 'undefined') {
            global.fetch = await import('node-fetch');
        }
        return true;
    } catch (e) {
        throw Error('InsightlyJS: could not polyfill fetch.');
    }
}

export default runtimeIsCompatible;
