

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    stocksId : {
        type: String,
        required: true,
        unique: true
    },
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    current_trading_price : {
        type: String,
        required: true,
    }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock };

