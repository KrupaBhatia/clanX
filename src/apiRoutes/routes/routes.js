const router = require("express").Router();

const stockController = require("../controllers/stockController");
const TradeController = require("../controllers/tradeController");
const PortfolioController = require("../controllers/portfolioController")

router.post("/addStocks" , stockController.addStock)


router.post("/portfolio/addTrade" , TradeController.addTrade)
router.post("/portfolio/updateTrade/:id" , TradeController.updateTrade)
router.post("/portfolio/removeTrade/:id" , TradeController.deleteTrade)


router.get("/portfolio" , PortfolioController.getPortfolio)
router.get("/portfolio/holdings" , PortfolioController.getHoldings);
router.get("/portfolio/returns" , PortfolioController.getCumulativeReturn)
module.exports = router;