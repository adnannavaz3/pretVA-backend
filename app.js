const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const product = require('./Routes/products-route');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connected to mongoDB'))
.catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use('/api/products', product);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`)
});
