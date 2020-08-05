const encrypt = require('./encrypt');

getBody = (message, publicKey, service) => {
    const RANDOMNO = encrypt.generateRandomNumber(16).toString();
    const initializationVector = encrypt.generateIV();
    const encryptedKey = encrypt.encryptKey(RANDOMNO, publicKey);
    const binaryData = Buffer.from(JSON.stringify(message));
    const encryptedData = encrypt.encryptData(binaryData, RANDOMNO, initializationVector);
    const body = {
        // Generate your own requestId below. This ID will be used for tracking transaction.
        "requestId": encrypt.generateMD5(new Date().toString()),
        "service": service,
        "encryptedKey": encryptedKey,
        "oaepHashingAlgorithm": "NONE",
        "iv": initializationVector,
        "encryptedData": encryptedData,
        "clientInfo": "",
        "optionalParam": ""
    };

    return body;
};

module.exports = { getBody };