
# mail-sender-rest-api

Hello everyone.

This project is a simple email sending bot designed for small-scale businesses and/or those with long mailing lists.

## Usage

1-) Navigate to the './config/env' file

2-) Enter any port number that suits you in the `PORT` section

3-) Enter your database connection in the `MONGO_URI` section

4-) You can enter any string in the `JWT_SECRET_KEY` section.

5-) Enter the name of your service in the `SITE_NAME` section

6-) Enter your email username and password in the `EMAIL_USERNAME` and `EMAIL_PASSWORD` sections.
## Install package dependencies

```javascript
npm install
```
## Start

```bash
  npm start
```

  
## Used npm packages

**bcrypt:** A cryptographic hash function library used for hashing and verifying user passwords.

**dotenv:** A library used to manage environment variables for the project. It is commonly used during development to securely manage sensitive information.

**express:** A fast and flexible web framework for developing Node.js-based web applications.

**express-async-handler:** A helper module that facilitates the use of async/await operations within Express middleware and route functions.

**jsonwebtoken:** A library providing JSON Web Token (JWT) based authentication and authorization. It is commonly used for user authentication in web applications.

**mongoose:** An Object Data Modeling (ODM) library for MongoDB. It simplifies database operations and enables the creation of structured data models on MongoDB.

**nodemailer:** A library used for sending emails in Node.js. It is compatible with various email service providers such as SMTP, Sendmail, and Amazon SES.
