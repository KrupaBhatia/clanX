# clanX

<!-- Data Model Design -->

So I have build  3 schemas 
-stocksSchema - to add stocks manually 
-trade schema - where in req.body it contains stocks objecId , date , quantity and type of trade with price 
-portfolioSchema  - it will get updated as stockes get buy and sell 



<!-- API Design -->

in stockController  - addStock APi has developed 
 in tradeController  - it contains add trade where i has call back function of updatePortfolio 
 also i has update and delere api with req.params where in id i has /tradeId
in portfolio - to get portfolio , get holdings using agggregate and reteuns api has created 

