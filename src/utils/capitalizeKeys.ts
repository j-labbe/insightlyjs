/**
 * Capitalizes all the keys of an object. 
 * 
 * Insightly prefers keys in all caps, so for uniformity, we'll capitalize all the keys.
 */
const capitalize = (obj: Object) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key.toUpperCase(), value]));
export default capitalize;