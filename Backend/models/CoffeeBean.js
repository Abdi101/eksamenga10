const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoffeeBeanSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    roastProfile: {
        type: String,
        required: true
    },
    roastType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countryOfOrigin: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    }

}, {timeStamps: true});

module.exports = mongoose.model('CoffeeBean', CoffeeBeanSchema);