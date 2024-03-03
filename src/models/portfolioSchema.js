const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    averagePrice: {
        type: Number,
        required: true
    }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = {Portfolio};
