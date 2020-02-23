const DashJS = require('dash');
const { utils } = require('@dashevo/wallet-lib');

const sdkOpts = {
    network: 'testnet',
    mnemonic: "auction trial reject imitate usual follow ill rug wash biology focus useful", 
};
const sdk = new DashJS.SDK(sdkOpts);

async function sendFundsFromSpecificAddress(address) {
    try {
        await sdk.isReady();
        const utxos = await sdk.account.getUTXOS();
        const outputsList = [{
            address: address,
            satoshis: 100000000*0.05
        }]
        const selectedUTXOS = await utils.coinSelection(utxos, outputsList);
        
        const transaction = sdk.account.createTransaction({
          recipient:"yPawZ451fvW7VPEJobCt7EoXDhrNNMr9jF",
          satoshis: 100000000*0.2,
          utxos: selectedUTXOS.utxos
        });
        const transactionId = await sdk.account.broadcastTransaction(transaction);
        console.log(transactionId);
        const balance = await sdk.account.getTotalBalance();
        console.log('Total Balance:', balance/100000000);
        
    } catch (e) {
        console.error('Something went wrong:', e);
    } finally {
        sdk.disconnect();
    }
}
//yjGCjhTPC3NKfMJKHz5ocdCMBc3g7t4MTZ

sendFundsFromSpecificAddress("yjGCjhTPC3NKfMJKHz5ocdCMBc3g7t4MTZ");