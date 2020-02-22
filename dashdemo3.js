//Mnemonic for wallet:
// announce display clarify stove mix bonus sketch curious small fly rather furnace
const DashJS = require('dash');

const sdkOpts = {
    network: 'testnet',
    mnemonic: "announce display clarify stove mix bonus sketch curious small fly rather furnace"
};
class Wallet {
    constructor() {
        if(! Wallet.instance) {
          this.sdk = new DashJS.SDK(sdkOpts); 
          Wallet.instance = this; 
        }
        this.sdk.account.events.on('FETCHED/UNCONFIRMED_TRANSACTION', (data) => {
            console.log('FETCHED/UNCONFIRMED_TRANSACTION');
            console.log(data.transaction);
        });
        return Wallet.instance;
    };

    async sendPayout(amount, address) {
        await this.sdk.isReady();
        try {
            const transaction = this.sdk.account.createTransaction({
                recipient: address, // Evonet faucet
                amount: amount, // 1 Dash
            });
            const result = await this.sdk.account.broadcastTransaction(transaction);
            console.log('Transaction broadcast!\nTransaction ID:', result);
        } catch (e) {
            console.error('Something went wrong:', e);
        } finally {
            this.sdk.disconnect();
        }
    }

    async getNewAddress(nextIndex) {
        try {
            await this.sdk.isReady();
            console.log("index given to DASHWALLET: " + nextIndex);
            const address = this.sdk.account.getAddress(nextIndex);
            console.log("Address Returned by Wallet:", address);
            return address;
        } catch (e) {
            console.error('Something went wrong:', e);
        } finally {
            this.sdk.disconnect();
        }
    }

    async getBalance() {
        try {
            await sdk.isReady();
            const totalBalance = sdk.account.getTotalBalance();
            const confirmedBalance = sdk.account.getConfirmedBalance();
            const unconfirmedBalance = sdk.account.getUnconfirmedBalance();
            const balance = {
                unconfirmed: unconfirmedBalance,
                confirmed: confirmedBalance,
                total: totalBalance
            }
            return balance;
        } catch (e) {
            console.error('Something went wrong:', e);
        } finally {
            sdk.disconnect();
        }
    }
    async onFetchUnconfirmed(data) {
        
    }
}
const DashWallet = new Wallet();
