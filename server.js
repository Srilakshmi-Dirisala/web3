const Web3 = require('web3');

const abi = require('./abi/ethereumabi.json');
const { CONTRACT_ADDRESS } = require('./constants/contracts');

 const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
//const provider=new Web3.providers.WebSocketProvider(`wss://bsc.getblock.io/mainnet/?api_key=2b2188bcbc2848ed8b0e2b45dbdcee1c`)
const contractInstance = new web3.eth.Contract(abi, CONTRACT_ADDRESS,web3);
const senderAddress = '0x6508357764329A097abF459791Af281594784127';

const decimals = 18;

// contractInstance.methods.setRateDecimals(decimals).send({from:senderAddress,gas:20000000})
//     .then(receipt => {
//         console.log('Transaction Receipt:', receipt);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });





contractInstance.methods.getMinAmount(2).call()
    .then(value => {
        console.log(`Returned Value: ${value}`);
    })
    .catch(error => {
        console.error('Error:', error);
    });


// contractInstance.methods.maxBUSDLimit(1).call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// contractInstance.methods.usersInvestmentsBUSD('0x6508357764329A097abF459791Af281594784127').call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// contractInstance.methods.BUSDdecimals().call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// contractInstance.methods.getMaxAmount(2).call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });




// contractInstance.methods.getVestingId('0x6508357764329A097abF459791Af281594784127').call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// contractInstance.methods.getClaimAmount('0x6508357764329A097abF459791Af281594784127',3).call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// contractInstance.methods.getClaimAmount('0x6508357764329A097abF459791Af281594784127',3).call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// contractInstance.methods.getClaimAmount('0x6508357764329A097abF459791Af281594784127',3).call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// contractInstance.methods.getClaimAmount('0x6508357764329A097abF459791Af281594784127',3).call()
//     .then(value => {
//         console.log(`Returned Value: ${value}`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });




