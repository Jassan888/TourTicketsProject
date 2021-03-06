const {time}= require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { assert } = require('console');
const RFT = artifacts.require('RFT.sol');
const NFT= artifacts.require('NFT.sol');
const DAI= artifacts.require('DAI.sol');

const DAI_AMOUNT= web3.utils.toWei('2500')

contract('RFT', async address=>{
    const[adnin, buyer1, buyer2, buyer3, buyer4,_]= address;

    it('ICO should work', async()=>{
        const dai= await DAI.new();
        const nft= await NFT.new('Cool NFT Token', 'NFT');
        await nft.mint(admin, 1);
        await Promise.all([
            dai.mint(buyer1, DAI_AMOUNT),
            dai.mint(buyer2, DAI_AMOUNT),
            dai.mint(buyer3, DAI_AMOUNT),
            dai.mint(buyer4, DAI_AMOUNT),    
        ]);

        const rft= await RFT.new(
        'Cool RFT', 'RFT',
        NFT.address, 1, 1,
        web3.utils.toWei('1000000'),
        dai.address
        );
        await nft.approve(rft.address, 1);
        await rft.StartIco();

        await dai.approve(rft.address, DAI_AMOUNT,{from: buyer1});
        await rft.buyShare(SHARE_AMOUNT,{from:buyer1});
        await dai.approve(rft.address, DAI_AMOUNT,{from: buyer2});
        await rft.buyShare(SHARE_AMOUNT,{from:buyer2});
        await dai.approve(rft.address, DAI_AMOUNT,{from: buyer3});
        await rft.buyShare(SHARE_AMOUNT,{from:buyer3});
        await dai.approve(rft.address, DAI_AMOUNT,{from: buyer4});
        await rft.buyShare(SHARE_AMOUNT,{from:buyer4});

        await time.increase(7 * 86400 + 1);
        await rft.withdrawIcoProfits();

        const balanceShareBuyer1= await rft.balanceOF(buyer1);
        const balanceShareBuyer2= await rft.balanceOF(buyer2);
        const balanceShareBuyer3= await rft.balanceOF(buyer3);
        const balanceShareBuyer4= await rft.balanceOF(buyer4);
        assert(balanceShareBuyer1.toString()===SHARE_AMOUNT);
        assert(balanceShareBuyer2.toString()===SHARE_AMOUNT);
        assert(balanceShareBuyer3.toString()===SHARE_AMOUNT);
        assert(balanceShareBuyer4.toString()===SHARE_AMOUNT);
        const balanceAdminDai= await daiBalanceOf(admin);
        assert(balanceAdminDai.toString()=== web3.utils.toWei('100000'));

    });
});