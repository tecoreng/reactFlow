// PARSE .ENV
require('dotenv').config();

// Configuring the database
require('./Configs/db.config.js');

// GLOBAL SETTINGS FILES
require('./Configs/globals'); 

const cors= require("cors");

// NODE FRAMEWORK
const express = require('express'); 

// TO PARSE POST REQUEST
const bodyParser = require('body-parser'); 

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 6500;

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// SERVE STATIC IMAGES FROM ASSETS FOLDER
app.use(express.static('Schema/v1')); 
app.use('/assets/images', express.static('assets/images'));

// ---------------------   RESPONSE HANDLER    ----------------------
app.use((req, res, next) => {
    const ResponseHandler = require('./Configs/responseHandler')
    res.handler = new ResponseHandler(req, res);
    next()
})

// --------------------------    ROUTES    --------------------------
const appRoutesV1 = require('./Routes/v1')
appRoutesV1(app)

// listen for requests
app.listen(port, () => {   
    console.log(`Server is listening on port ${port}`);
});