# VGS-test

[DEMO](https://daph3105.github.io/VGS-test/)

[VIDEO DEMO](https://www.youtube.com/watch?v=2_6yA7Lnf0I)


## Description

Simple one-page application for entering credit card data using the [VGS platform](https://www.verygoodsecurity.com/) to encrypt and reveal the following fields:
- Credit Card number
- Credit Card CVV
- Credit Card Exp. Date

## Technologies Used
- This app was built using HTML, CSS, JavaScript, and VGS collect on the client side.
- And Node.js with Express.js on the server side.
- ngrok and GitHub Pages were used for deployment.

## Clone or Download
```
$ git clone https://github.com/daph3105/VGS-test.git
$ npm i
```

## Usage (Server side on your machine)
- have Node and NPM installed
- create .env file to include your VGS credentials:
  - IDENTIFIER = ***
  - USER = **
  - PASS = **
 ```
 $ node app.js 
 -- to run the server
 ```


