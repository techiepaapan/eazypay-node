const express = require('express');
const router = express.Router();

const encrypt = require('../../components/encrypt');
const decrypt = require('../../components/decrypt');
const config = require('../../components/config.json');
const prepareBody = require('../../components/prepareBody');
const fetch = require('../../components/callAPI');
const publicKey = uatPublicKey;
const privateKey = uatPrivateKey;

// Update all the values after completion of merchant registration
const MerchantId = "123456", // Unique value of length(min-max): 6-8
    subMerchantId = "10", // Unique value of length(min-max): 2-2
    merchantName = "Tchppn", // Unique, Length: 6-digit
    merchantCat = "0763",
    merchantAccount = "123456789012"; // Merchant Account number registered for EazyPay

//Encryption Test API
router.post('/EncTest', async (req, res) => {
    try {
        const message = req.body;
        const body = prepareBody.getBody(message, publicKey, '');
        const response = await fetch.callAPI(config.uatURL.encTestURL, config.uatHeaders, body);
        if (!response.status) {
            res.status(400).json({ msg: response.message });
        }
        else {
            res.json({
                encryptedData: body,
                serverResponse: response.message
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


//Decryption Test API
router.post('/DecTest', async (req, res) => {
    try {
        const response = await fetch.callAPI(config.uatURL.decTestURL, config.uatHeaders, req.body);
        if (!response.status) {
            res.status(400).json({ msg: response.message });
        }
        else {
            const jsonData = response.message;
            const encryptedMessage = jsonData.encryptedData;
            const encryptedKey = jsonData.encryptedKey;
            const decrypted = decrypt.decryptData(privateKey, encryptedMessage, encryptedKey);
            if (!decrypted) {
                res.status(400).json({ msg: "Decryption Failed" });
            }
            else {
                res.json({
                    serverResponse: jsonData,
                    decryptedData: decrypted
                });
            }
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


// Channel Registration
router.post('/ChannelReg', async (req, res) => {
    try {
        let TEXT = JSON.parse(JSON.stringify(req.body));
        const signPlainText = TEXT.channelName + "|" + TEXT.enablePg + "|" + TEXT.enableCib + "|" + TEXT.enableOtc + "|" + TEXT.status + "|" + TEXT.enableCorp + "|" + TEXT.statusUrl + "|" + TEXT.oneTimeFee + "|" + TEXT.enableCards + "|" + TEXT.regOTPFlg + "|" + TEXT.tncOTPFlg + "|" + TEXT.enableCharges + "|" + TEXT.corpUserFlg + "|" + TEXT.dynamicKey;
        TEXT.sgn = encrypt.generateSHA512(signPlainText);
        const message = TEXT;
        const body = prepareBody.getBody(message, publicKey, 'ChannelRegistration');
        const response = await fetch.callAPI(config.uatURL.channelReg, config.uatHeaders, body);
        if (!response.status) {
            res.status(400).json({ msg: response.message });
        }
        else {
            const jsonData = response.message;
            const encryptedMessage = jsonData.encryptedData;
            const encryptedKey = jsonData.encryptedKey;
            const decrypted = decrypt.decryptData(privateKey, encryptedMessage, encryptedKey);
            if (!decrypted) {
                res.status(400).json({ msg: "Decryption Failed" });
            }
            else {
                res.json(decrypted);
            }
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});



// Merchant Registration
router.post('/MerchantReg', async (req, res) => {
    try {
        let TEXT = JSON.parse(JSON.stringify(req.body));
        const signPlainText = TEXT.creditAccountNumber + "|" + TEXT.mobileNo + "|" + TEXT.panNo + "|" + TEXT.channel + "|" + TEXT.merchantShortName + "|" + TEXT.returnURL + "|" + TEXT.pushURL;
        TEXT.signature = encrypt.generateSHA512(signPlainText);
        const message = TEXT;
        const body = prepareBody.getBody(message, publicKey, 'MerchantRegistrationService');
        const response = await fetch.callAPI(config.uatURL.merchantReg, config.uatHeaders, body);
        if (!response.status) {
            res.status(400).json({ msg: response.message });
        }
        else {
            const jsonData = response.message;
            const encryptedMessage = jsonData.encryptedData;
            const encryptedKey = jsonData.encryptedKey;
            const decrypted = decrypt.decryptData(privateKey, encryptedMessage, encryptedKey);
            if (!decrypted) {
                res.status(400).json({ msg: "Decryption Failed" });
            }
            else {
                res.json(decrypted);
            }
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});



// Payment Initiation
router.post('/PaymentInit', async (req, res) => {
    try {
        let TEXT = JSON.parse(JSON.stringify(req.body));
        const pgRefNo = new Date().getTime().toString();
        const mandatoryValues = pgRefNo + "|" + subMerchantId + "|" + TEXT.tranAmount + "|" + TEXT.mobileno + "|" + merchantCat + "|" + merchantName + "|" + merchantAccount;
        const signPlainText = MerchantId + "|" + subMerchantId + "|" + TEXT.optionalValues + "|" + mandatoryValues + "|" + TEXT.tranAmount + "|" + pgRefNo + "|" + TEXT.mobileno;
        TEXT.pgRefNo = pgRefNo;
        TEXT.MerchantId = MerchantId;
        TEXT.subMerchantId = subMerchantId;
        TEXT.mandatoryValues = mandatoryValues;
        TEXT.signature = encrypt.generateSHA512(signPlainText);
        const message = TEXT;
        const body = prepareBody.getBody(message, publicKey, 'PaymentInitiation');
        const response = await fetch.callAPI(config.uatURL.paymentInit, config.uatHeaders, body);
        if (!response.status) {
            res.status(400).json({ msg: response.message });
        }
        else {
            const jsonData = response.message;
            const encryptedMessage = jsonData.encryptedData;
            const encryptedKey = jsonData.encryptedKey;
            const decrypted = decrypt.decryptData(privateKey, encryptedMessage, encryptedKey);
            if (!decrypted) {
                res.status(400).json({ msg: "Decryption Failed" });
            }
            else {
                res.json(decrypted);
            }
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
