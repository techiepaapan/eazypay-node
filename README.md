# EazyPay

Eazypay is a first of its kind secure payment service by ICICI Bank in India. It enables institutions to collect money from their partners/customers through multiple channels. The system offers multiple payment modes, both offline and online- like cash, Cheque, NEFT/RTGS, cards and Net Banking. It enables the institution to collect money from any bank customer in India.


# EazyPay Integration

## Note:
1. **Please refer the EazyPay API Template document for details regarding Eazypay APIs. You can get it from EazyPay team.**
2. **Config file (./components/config.json)** contains URLs and headers. Please update them accordingly.
3. Public key required for encryption will be provided by EazyPay team.
4. You have to get CA-Signed(Self-Signed for UAT) 4096-bit certificate against domain and the public certificate must be shared with EazyPay team. The private certificate will be used for decryption.
5. Place both public and private key in ./cert/uat(for UAT) or ./cert/prod(for production). Update the names in server.js, if needed.
6. **Make sure your IP(static) is whitelisted.**
7. Integrate the code into your project as per requirement.


## Installation (For Testing)

 1. Create a new folder: `mkdir eazypay`
 2. Copy the content of the downloaded zip file in your newly created folder.
 3. Enter folder: `cd eazypay`
 4. Install dependencies: `npm install`
 5. Start the application: `npm start`
 6. The local server can be accessewd on `http://localhost:5000/`
 7. Use Postman or similar application for testing.


## User Acceptance Testing (UAT)


**API: Encryption Test**<br/>
URL: http://localhost:5000/api/uat/EncTest <br/>
Method: POST<br/>
Sample Data:
```
{
  "test":"12"
}
```


**API: Decryption Test**<br/>
URL: http://localhost:5000/api/uat/DecTest <br/>
Method: POST<br/>
Sample Data:
{
  "test":"12"
}


**API: Channel Registration**<br/>
URL: http://localhost:5000/api/uat/ChannelReg <br/>
Method: POST<br/>
Sample Data:
```
{
  "channelName": "", // API key
  "enablePg": "0",
  "enableCib": "1",
  "enableOtc": "1",
  "status": "0",
  "enableCorp": "0",
  "statusUrl": "", // Enter the statusUrl provided by ICICI
  "oneTimeFee": "0",
  "enableCards": "0",
  "regOTPFlg": "1",
  "tncOTPFlg": "1",
  "enableCharges": "0",
  "corpUserFlg": "0",
  "dynamicKey": "1"
}
```


**API: Merchant Registration**<br/>
URL: http://localhost:5000/api/uat/MerchantReg <br/>
Method: POST<br/>
Sample Data:
```
{
  "creditAccountNumber": "xxxxxxxx",
  "panNo": "xxxxxxxx",
  "iMerchantId": "123456", // Unique value provided by you of length(min-max): 6-8. Keep this value safely for tracking purpose
  "mobileNo": "0000000000",
  "merchantShortName": "Tchppn", // Unique 6-digit merchant name
  "returnURL": "", // Refer API document
  "pushURL": "", // Refer API document
  "channel": ""
}
```


**API: Payment Initiation**<br/>
URL: http://localhost:5000/api/uat/PaymentInit <br/>
Method: POST<br/>
Sample Data:
```
{
  "Paymode": "9",
  "tranAmount": "100",
  "expiryDate": "28/09/2020",
  "mobileno": "94*******6", //customer mobile no
  "optionalValues": ""
}
```
