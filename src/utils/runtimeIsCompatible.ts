import global from '../globalVars';
import isNode from '../utils/isNode';
//@ts-ignore
import { fetch as fetchPolyfill } from 'whatwg-fetch';

// polyfill fetch for node or browsers that don't support it

async function runtimeIsCompatible() {
    try {
        if (isNode()) {
            if (typeof fetch === 'undefined') {
                global.fetch = await import('node-fetch');
            }
        } else {
            if (typeof fetch === 'undefined') {
                global.fetch = fetchPolyfill;
            }
        }
        return true;
    } catch (e) {
        throw Error('InsightlyJS: could not polyfill fetch.');
    }
}

export default runtimeIsCompatible;
