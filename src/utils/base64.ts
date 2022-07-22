const Base64 = {
    encode: (str: string) => {
        /**
         * btoa() has been deprecated in favor of Buffer.from(str, 'utf8').toString('base64') for Node.js v12.0.0+
         * 
         * Because this package can be used on both client and server side, we need to ensure compatibility with both.
         */

        if (typeof Buffer === "undefined") {
            if (typeof btoa === "undefined") {
                throw new Error("Could not resolve base64 encoding function");
            } else {
                return btoa(str);
            }
        } else {
            return Buffer.from(str, "utf8").toString("base64");
        }
    }
};

export default Base64;