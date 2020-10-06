const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    buyer_name: {type: String},
    lead_time: {type: String},
    price_rs: {type: String},
    product_id: {type: String},
    product_name: {type: String},
    quantity: {type: String},
    weight_gsm: {type: String}
});

module.exports = mongoose.model('Products', productSchema);

