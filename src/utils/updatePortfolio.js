const {Trade} = require('../models/tradeSchema');
const {Portfolio} = require('../models/portfolioSchema');
const {Stock} = require('../models/stocksSchema');


const updatePortfolio = async (req, res) => {
    try {
        // Fetch all trades
        const trades = await Trade.find();

        // Group trades by stock
        const tradesByStock = trades.reduce((acc, trade) => {
            if (!acc[trade.stock]) {
                acc[trade.stock] = [];
            }
            acc[trade.stock].push(trade);
            return acc;
        }, {});

            // Calculate total quantity and average price for each stock
            const portfolioData = [];
            for (const stockId in tradesByStock) {
                const stockTrades = tradesByStock[stockId];
                let totalQuantity = 0;
                let totalValue = 0;
            
                for (const trade of stockTrades) {
                    if (trade.type === 'buy') {
                        totalQuantity += trade.quantity;
                        totalValue += trade.quantity * trade.price;
                    } else if (trade.type === 'sell') {
                        totalQuantity -= trade.quantity;
                        totalValue -= trade.quantity * trade.price;
                    }
                }
            
                const averagePrice = totalQuantity !== 0 ? totalValue / totalQuantity : 0;
                portfolioData.push({ stock: stockId, totalQuantity, averagePrice });
            }
            

        // Combine with stock information
        const portfolioObjects = [];
        for (const item of portfolioData) {
            const stockInfo = await Stock.findById(item.stock);
            const portfolioObject = {
                stock: item.stock,
                symbol: stockInfo.symbol,
                totalQuantity: item.totalQuantity,
                averagePrice: item.averagePrice
            };
            portfolioObjects.push(portfolioObject);
        }

        // Clear existing portfolio data and insert new data
        await Portfolio.deleteMany({});
        await Portfolio.insertMany(portfolioObjects);

        // Send response if needed
        // res.status(200).json({ message: 'Portfolio updated successfully' });
    } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports.updatePortfolio = updatePortfolio