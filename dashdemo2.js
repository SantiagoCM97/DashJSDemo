const DashJS = require('dash');
const { utils } = require('@dashevo/wallet-lib');
//yjGCjhTPC3NKfMJKHz5ocdCMBc3g7t4MTZ
const sdkOpts = {
    network: 'testnet',
    mnemonic: "auction trial reject imitate usual follow ill rug wash biology focus useful", // this indicates that we want a new wallet to be generated
    // if you want to get a new address for an existing wallet
    // replace 'null' with an existing wallet mnemonic
};
const sdk = new DashJS.SDK(sdkOpts);

async function getBalance() {
    try {
        await sdk.isReady();
        const utxos = await sdk.account.getUTXOS();
        const outputsList = [{
            address:'yjGCjhTPC3NKfMJKHz5ocdCMBc3g7t4MTZ',
            satoshis: 100000000*0.05
        }]
        console.log('UTXOS: ', utxos);
        const selectedUTXOS = await utils.coinSelection(utxos, outputsList);
        console.log('SELECTED UTXOS: ',selectedUTXOS)
        
        const transaction = sdk.account.createTransaction({
          recipient:"yPawZ451fvW7VPEJobCt7EoXDhrNNMr9jF",
          satoshis: 100000000*0.2,
          utxos: selectedUTXOS.utxos
        });
        console.log("TRANSACTION", transaction);
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
//getBalance();
async function payToRecipient() {

}
async function startService() {

    try {
        await sdk.isReady();
        // Import a tx that happened in the network
        // See for the format
        const addresses = {};
        sdk.account.storage.importAddresses(addresses, sdk.account.walletId);
        // Get any specific address
        const specific = sdk.account.getAddress(100);
        // Generate a batch of all 200 first addreses
        const poolAddresses = [];
        for (let i = 0; i <= 200; i += 1) {
            poolAddresses.push(sdk.account.getAddress(i).address);
        }
        console.log("addresses")
        console.log(poolAddresses);
        console.log("FINAL:");
        console.log(sdk.account.getAddress(10000).address);

    } catch (e) {
        console.error('Something went wrong:', e);
    } finally {
        sdk.disconnect();
    }
};
//startService();
getBalance();