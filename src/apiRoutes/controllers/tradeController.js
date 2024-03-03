//Global Imports
const mongoose = require("mongoose");

const {Trade} = require("../../models/tradeSchema");
const {updatePortfolio} = require("../../utils/updatePortfolio")

const addTrade = async function(req, res) {
    try {
        const { stock, date, price, type, quantity } = req.body;

        // Check if it's a sell trade
        if (type === 'sell') {
            // Retrieve all trades for the given stock
            const trades = await Trade.find({ stock });

            // Calculate the total quantity of stocks owned
            const totalQuantityOwned = trades.reduce((total, trade) => {
                if (trade.type === 'buy') {
                    return total + trade.quantity;
                } else if (trade.type === 'sell') {
                    return total - trade.quantity;
                }
            }, 0);

            // Check if there are enough stocks to sell
            if (totalQuantityOwned < quantity) {
                return res.status(400).json({ success: false, message: 'Not enough stocks to sell' });
            }
        }

        // Create a new trade with tradeSuccess set to false
        const newTrade = new Trade({
            stock,
            date,
            price,
            type,
            quantity,
            tradeSuccess: false
        });

        // Save the new trade
        await newTrade.save();

               // Call the updatePortfolio function to update the portfolio
               await updatePortfolio();

               // Update the trade to set tradeSuccess to true after updating the portfolio
               newTrade.tradeSuccess = true;
               await newTrade.save();
       
               res.status(201).json({ success: true, data: newTrade });


    } catch (error) {
        console.error('Error creating trade:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}





const updateTrade = async function(req ,res) { 
    try {
        const id = req.params.id; // Access trade ID from req.params
        const { price, quantity } = req.body;

        // Check if the trade ID is provided
        if (!id) {
            return res.status(400).json({ message: 'Trade ID is required' });
        }

        // Find and update the trade by ID
        const updatedTrade = await Trade.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        // Check if trade is found and not deleted
        if (updatedTrade && !updatedTrade.isDeleted) {
            return res.status(200).json({ status: true, data: updatedTrade, code: 200, message: "Trade data updated" });
        } else {
            return res.status(404).json({ status: false, message: "Trade not found", code: 404 });
        }
    } catch (error) {
        console.error('Error updating trade:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteTrade = async function(req,res){
    try {
        const { id } = req.params;

        // Check if the trade ID is provided
        if (!id) {
            return res.status(400).json({ message: 'Trade ID is required' });
        }

        // Find and update the trade by ID to mark it as deleted
        const updatedTrade = await Trade.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });

        // Check if trade is found and updated
        if (updatedTrade) {
            return res.status(200).json({ status: true, data: updatedTrade, code: 200, message: "Trade deleted successfully" });
        } else {
            return res.status(404).json({ status: false, message: "Trade not found", code: 404 });
        }
    } catch (error) {
        console.error('Error deleting trade:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {addTrade ,updateTrade ,deleteTrade}

