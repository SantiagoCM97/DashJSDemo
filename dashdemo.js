const DashJS = require('dash');

const sdkOpts = {
  network: 'testnet',
  mnemonic: null, // this indicates that we want a new wallet to be generated
                  // if you want to get a new address for an existing wallet
                  // replace 'null' with an existing wallet mnemonic
};
const sdk = new DashJS.SDK(sdkOpts);

async function createWallet() {
  try {
    await sdk.isReady();
    const mnemonic = sdk.wallet.exportWallet();
    const address = sdk.account.getUnusedAddress();
    console.log('Mnemonic:', mnemonic);
    console.log('Unused address:', address.address);
  } catch (e) {
    console.error('Something went wrong:', e);
  } finally {
    sdk.disconnect();
  }
}
createWallet();