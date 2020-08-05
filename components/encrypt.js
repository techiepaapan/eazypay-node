const mCrypto = require('crypto');
var sha512 = require('js-sha512').sha512;

// Generate random number of n-digit
generateRandomNumber = (n) => {
    return Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
}

//Generate 16-bit base64 Initialization Vector(IV)
generateIV = () => {
    const randomBytes = require('crypto').randomBytes(16);
    return randomBytes.toString('base64');
}

//Generate sha512 hash
generateSHA512 = (text) => {
    return sha512(text);
}

//Generate md5 hash
generateMD5 = (text) => {
    return mCrypto.createHash('md5').update(text).digest("hex");
}


// Generates encryption key using RSA_PKCS1_PADDING
encryptKey = (keyVal, publicKey) => {
    const binaryKey = Buffer.from(keyVal);
    const encryptedKey = mCrypto.publicEncrypt({
        key: publicKey,
        padding: mCrypto.constants.RSA_PKCS1_PADDING
    }, binaryKey).toString('base64');
    return encryptedKey;
}

// Encrypt data using AES-128-CBC base64
encryptData = (binaryData, keyVal, ivBase64) => {
    const key = Buffer.from(keyVal);
    const iv = Buffer.from(ivBase64, 'base64');

    const cipher = mCrypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(binaryData, 'utf8', 'base64')
    encrypted += cipher.final('base64');
    return encrypted;
}

module.exports = { generateRandomNumber, generateIV, generateSHA512, generateMD5, encryptKey, encryptData };