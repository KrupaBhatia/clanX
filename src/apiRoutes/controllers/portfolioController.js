const mongoose = require("mongoose");

const {Trade} = require('../../models/tradeSchema');
const {Portfolio} = require('../../models/portfolioSchema');
const {Stock} = require('../../models/stocksSchema');



const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find();
        if (portfolio.length === 0) {
            return res.status(404).json({ message: 'Portfolio is empty' });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getHoldings = async (req, res) => {
    try {
        const holdings = await Portfolio.aggregate([
            {
                $lookup: {
                    from: 'stocks',
                    localField: 'stock',
                    foreignField: '_id',
                    as: 'stock'
                }
            },
            {
                $unwind: '$stock'
            },
            {
                $project: {
                    _id: 0,
                    symbol: '$stock.symbol',
                    totalQuantity: 1,
                    averagePrice: 1
                }
            }
        ]);

        res.status(200).json({success : true , data :holdings});
    } catch (error) {
        console.error('Error fetching holdings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCumulativeReturn = async (req, res) => {
    try {
        // Fetch the portfolio
        const portfolio = await Portfolio.find();

        // Calculate cumulative return for each stock in the portfolio
        const cumulativeReturns = portfolio.map(stock => {
            // Retrieve the average buying price for the current stock
            const averageBuyingPrice = stock.averagePrice;

            // Assuming final price is 100
            const finalPrice = 100;

            // Calculate cumulative return
            const cumulativeReturn = finalPrice - averageBuyingPrice;

            return { stockId: stock._id, cumulativeReturn };
        });

        res.status(200).json({ success: true, data: cumulativeReturns });
    } catch (error) {
        console.error('Error calculating cumulative return:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



module.exports = {  getPortfolio ,getHoldings ,getCumulativeReturn};
