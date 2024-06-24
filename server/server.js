
//imports 
require('dotenv/config');

const express = require('express');
const bdParser = require('body-parser');
const morgan = require('morgan');
const authJWT = require('./helpers/jwt.js');
const errorHandler = require('./helpers/errorHandler.js');
const cors = require('cors')
const app = express();
const { default: mongoose } = require('mongoose');
const api = process.env.BASE_URL;


//middlewares
app.use(cors());
app.options('*',cors())


app.use(bdParser.json())
app.use(morgan('tiny'));

//MIDDLE WARE FOR AUTH
// app.use(authJWT);

//MIDDLE WARE FOR ERROR HANDLING
app.use(errorHandler)

//db connection establishment
mongoose.connect(process.env.DB_CONNECTION_STRING);



//routes
const categories = require('./routes/categories.js');
const products = require('./routes/products.js');
const orders = require('./routes/orders.js');
const auth = require('./routes/auth.js');
const address = require('./routes/address.js');
const uploadPhotos = require('./routes/uploadPhotos.js')



app.use(`${api}/categories`,categories);
app.use(`${api}/products`,products);
app.use(`${api}/auth`,auth);
app.use(`${api}/address`,address);
app.use(`${api}/orders`,orders);
app.use(`${api}/upload`,uploadPhotos);



//server start listing 
app.listen({port:process.env.PORT || 8080},()=>{
    console.log("server started")
})

