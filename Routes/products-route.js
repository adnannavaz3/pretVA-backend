const express = require('express');
const Products = require('../models/products-model');
const router = express.Router();

router.get('/buyer', async (req, res) => {
    try{
        const { buyer_name } = req.body;
        const products = await Products.find({
            buyer_name
        })
        res.send(products);
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/filter', async (req, res) => {
    try{
        const { buyer_name, 
                product_name,  
                weight_gsm,
                fabric_quality,
                length_mtr } = req.body;
        const products = await Products.find({
            buyer_name: (buyer_name) ? buyer_name : /.*/,
            weight_gsm: (weight_gsm) ? weight_gsm : /.*/,
            product_name: (product_name) ? product_name : /.*/,
            quantity: (length_mtr) ? length_mtr : /.*/,
            lead_time: (fabric_quality) ? fabric_quality: /.*/
        });
        res.send(products);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/all', async (_req, res) => {
    try{
        const products = await Products.find({})
        res.send(products);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/options', async (_req, res) => {
    try{
        const product_name = await Products.find({}).distinct('product_name');
        const buyer_name = await Products.find({}).distinct('buyer_name');
        const weight_gsm = await Products.find({}).distinct('weight_gsm');
        const lead_time = await Products.find({}).distinct('lead_time');
        const quantity = await Products.find({}).distinct('quantity');
        res.send({
            product_name,
            buyer_name,
            weight_gsm,
            fabric_quality: lead_time,
            length_mtr: quantity
        });
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/options', async (req, res) => {
    try{
        const products = {
            buyer_name: (req.body.buyer_name) ? (req.body.buyer_name) : /.*/,
            weight_gsm: (req.body.weight_gsm) ? (req.body.weight_gsm) : /.*/,
            product_name: (req.body.product_name) ? (req.body.product_name) : /.*/,
            quantity: (req.body.length_mtr) ? (req.body.length_mtr) : /.*/,
            lead_time: (req.body.fabric_quality) ? (req.body.fabric_quality): /.*/
        }

        const product_name = await Products.find(products).distinct('product_name');
        const buyer_name = await Products.find(products).distinct('buyer_name');
        const weight_gsm = await Products.find(products).distinct('weight_gsm');
        const lead_time = await Products.find(products).distinct('lead_time');
        const quantity = await Products.find(products).distinct('quantity');
        res.send({
            product_name,
            buyer_name,
            weight_gsm,
            fabric_quality: lead_time,
            length_mtr: quantity
        });
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = router;