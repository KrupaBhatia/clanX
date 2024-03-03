//Global Imports
const mongoose = require("mongoose");

const {Stock} = require("../../models/stocksSchema")

// POST API endpoint to add a stock
const addStock = async (req, res) => {
    let { stocksId, symbol, current_trading_price } = req.body;

    stocksId = stocksId.trim();

    // Validate stocksId
    if (!/^[a-zA-Z0-9]+$/.test(stocksId)) {
        return res.status(400).json({ message: 'Invalid stocksId format. It should be alphanumeric.' });
    }

    try {
        // Check if the stock symbol already exists
        const existingStock = await Stock.findOne({ symbol });
        if (existingStock) {
            return res.status(400).json({ message: 'Stock symbol already exists' });
        }

        // Create a new stock
        const newStock = new Stock({ stocksId, symbol, current_trading_price });
        await newStock.save();

        res.status(201).json({ success: true, data: newStock });
    } catch (error) {
        console.error('Error adding stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { addStock }
