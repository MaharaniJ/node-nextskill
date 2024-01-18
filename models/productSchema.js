const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id:String,
    imagSrc:String,
    name:String,
    price:String,
    description:String,
    availablity:String,
    sku:String,
    categories:String
})
const Productdata = new mongoose.model("products",productSchema );
module.exports = Productdata;