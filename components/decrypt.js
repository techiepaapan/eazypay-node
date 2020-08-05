const mCrypto = require('crypto');

//
getIV = (encryptedMessage) => {
    const buff = Buffer.from(encryptedMessage, 'base64');
    const IV = buff.slice(0, 16);
    return IV;
}

getSessionKey = (privateKey, keyVal) => {
    const binaryKey = Buffer.from(keyVal, 'base64');
    try {
        const sessionKey = mCrypto.privateDecrypt({
            key: privateKey,
            padding: mCrypto.constants.RSA_PKCS1_PADDING
        }, binaryKey);
        return sessionKey;
    } catch (err) {
        console.log(err.message)
        return false;
    }
}

decryptData = (privateKey, encryptedMessage, encryptedKey) => {

    const IV = getIV(encryptedMessage);
    const sessionKey = getSessionKey(privateKey, encryptedKey);
    if (!sessionKey) return false;
    else {
        try {
            const buff = Buffer.from(encryptedMessage, 'base64');
            const message = buff.slice(16, buff.length);
            const slicedMessage = message.toString('base64');
            const decipher = mCrypto.createDecipheriv('aes-128-cbc', sessionKey, IV);
            let decrypted = decipher.update(slicedMessage, 'base64');
            decrypted += decipher.final();
            return JSON.parse(decrypted);
        } catch (err) {
            console.log(err.message);
            return false;
        }
    }
}

module.exports = { decryptData };