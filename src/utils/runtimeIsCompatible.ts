import isNode from "./isNode";

function getNumericalNodeVersion() {
    const version = process.versions.node;
    const [major, minor] = version.split('.').map(Number);
    return { major, minor };
}

// thanks to john-jones, murb, and kennebec
// https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
function getBrowserVersion() {
    let ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: tem[1] || '' };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/);
        if (tem != null) {
            return { name: 'Opera', version: tem[1] };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: parseFloat(M[1]),
    };
}

function runtimeIsCompatible() {
    if (isNode()) {
        return getNumericalNodeVersion().major >= 18;
    } else {
        const browser = getBrowserVersion();
        switch (browser.name) {
            case 'Chrome':
                return browser.version >= 42;
            case 'Firefox':
                return browser.version >= 39;
            case 'Safari':
                return browser.version >= 10.1;
            case 'Opera':
                return browser.version >= 29;
            case 'IE':
                return false;
            case 'Edge':
                return browser.version >= 14;
            default:
                // assuming it's a modern browser
                return true;
        }
    }
}

export default runtimeIsCompatible;