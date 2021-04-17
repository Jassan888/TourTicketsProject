const TourTicket, DAI, ERC20, NFT, RFT  = artifacts.require("TourTicket","DAI","ERC20", "NFT","RFT");

module.exports = function (deployer) {
  deployer.deploy(TourTicket, DAI, ERC20, NFT,RFT);
};
