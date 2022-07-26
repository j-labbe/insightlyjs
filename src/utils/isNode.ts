function isNode() {
    if (typeof process === 'undefined') {
        return false;
    }
    return true;
}

export default isNode;
