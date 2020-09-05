# multi-proxy-api

A private-use proxy with the following end-points:

### Mars Weather
Displays the current weather on Mars. This response is cached in memory every 10 minutes
* **URL**
    
    /api/v1/mars-weather
    
* **Method:**
    
    ```GET```
    
*  **URL Params**

   None
   
* **Data Params**

    None
    
* **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ Mars Weather Data in JSON format }`
      
* **Error Response:**

    * **Code:** 429 Too Many Requests<br />
      **CONTENT:** `{ error : "Too many requests, please try again later."`
    
    OR
    
    * **Code:** 40 Unauthorized<br />
      **CONTENT:** `{ message : "Invalid API Key"`
    
The proxy has the following features:
* Optional API key requirement
    * This is off by default
    * Currently, this doesn't utilize a key database. Instead, it's hard-coded with a master api located in the .env
    * If this is desired, set ```API_KEY_REQUIRED=true``` in your .env
    * The default master API key is ```12345```. Set ```MASTER_API_KEY=<key>``` to override.
* Rate Limiting
    * Requests are rate-limited by IP address using express-rate-limit
    * Requests are restricted to 60 requests every 30 seconds
        * This is very generous considering if an API key is already assigned, there is some level of trust.
* Speed Limiting
    * Requests are speed-limited by IP address using express-slow-down
    * Requests are restricted to 2 requests each second. After that further requests will be slowed down by 500ms for each subsequent request until the rate-limit is hit.
    

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
   * Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
* [express-slow-down](https://www.npmjs.com/package/express-slow-down)
    * Basic rate-limiting middleware for Express that slows down responses rather than blocking them outright. Use to limit repeated requests to public APIs and/or endpoints such as password reset.

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [mocha](https://www.npmjs.com/package/mocha)
  * ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```
