const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    tradeSuccess : {
        type: Boolean
    },
    isDeleted : {
        type : Boolean, 
        defalut: false 
    }
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = { Trade };
