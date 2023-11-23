
const Web3=require('web3')
const testnetPresale=require('./abi/abis')
const web3Rpc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
const chainId = testnetPresale.chainId

const getPresaleContract = async (web3, chainId) => {
    try {
        if (chainId === testnetPresale.chainId) {
            const contractInstance = new web3.eth.Contract(testnetPresale.abi, testnetPresale.contractAddress);
           console.log("contractInstance",contractInstance);
        }

    } catch (err) {
        return err;
    }
}

