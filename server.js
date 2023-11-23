
  
  
  
  
  
  import {
      testnetPresale,
      testnetVestingContract,
      testnetTokenContract,
      testnetBUSD
  } from "./contractInfo";
  import Web3 from "web3";
  const web3Rpc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
  const chainId = testnetPresale.chainId
  
  const getPresaleContract = async (web3, chainId) => {
      try {
          if (chainId === testnetPresale.chainId) {
              const contractInstance = new web3.eth.Contract(testnetPresale.abi, testnetPresale.contractAddress);
              return contractInstance;
          }
  
      } catch (err) {
          return err;
      }
  }
  
  export const getUsdPrice = async (ethAmount) => {
      try {
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.getEthPriceInUsd().call();
          return (ethAmount * Number(result));
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  export const getBUSDContract = async (web3, chainId) => {
      try {
          if (chainId === testnetBUSD.chainId) {
              const contractInstance = new web3.eth.Contract(testnetBUSD.abi, testnetBUSD.contractAddress);
              return contractInstance;
          }
      } catch (err) {
          return err;
      }
  }
  
  export const getTokenAmount = async (ethAmount) => {
      try {
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.getTokensPerEth(web3Rpc.utils.toWei(ethAmount.toString(), "ether"), 1).call();
  
          let decimals = await getTokenDecimals()
          return (Number(result) / 10 ** decimals);
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  export const getTokenBUSD = async (usdAmount) => {
  
      try {
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.getTokenPerBUSD(web3Rpc.utils.toWei(usdAmount.toString(), "ether"), 1).call();
  
          let decimals = await getTokenDecimals();
          console.log("result isss", result);
          if (result && Number(result) > 0) {
              return (Number(result) / 10 ** decimals);
          } else {
              return 0
          }
  
      } catch (error) {
          console.log(error)
          return error
      }
  }
  
  export const getTokenSold = async () => {
      try {
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.tokenSold(1).call();
  
          return (result)
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  export const getTokenDecimals = async () => {
  
      try {
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.tokenDecimals().call();
          return Number(result);
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  
  
  export const isPresaleOpened = async (web3, chainId) => {
      try {
          let contractInstance = await getPresaleContract(web3, chainId)
          let result = await contractInstance.methods.isPresaleOpen().call();
          return result;
      } catch (error) {
          console.log(error)
          return error
      }
  }
  
  export const getTotalTokensSold = async () => {
  
      try {
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.tokenSold(1).call();
          let dem = await getTokenDecimals()
          return (Number(result) / 10 ** dem);
      } catch (error) {
          console.log(error)
          return error
      }
  }
  
  export const getTotalEthSold = async () => {
      try {
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.totalEthAmount().call();
          return (Number(result) / 1e18);
      } catch (error) {
          console.log(error)
          return error
      }
  }
  
  export const getUserInvestedEthAmount = async (web3, chainId, account) => {
      try {
          let contractInstance = await getPresaleContract(web3, chainId)
          let result = await contractInstance.methods.usersInvestments(account).call();
          return Number(result) / 1e18;
      } catch (error) {
          console.log(error)
          return error
      }
  }
  
  export const buyTokens = async (web3, chainId, account, ethAmount) => {
      try {
          let contractInstance = await getPresaleContract(web3, chainId)
          let result = await contractInstance.methods.buyToken(2).send({ from: account, value: web3.utils.toWei(ethAmount.toString(), 'ether') });
          return result;
      } catch (error) {
          console.log(error)
          return error
      }
  }
  
  const getVestingContract = async (web3, chainId) => {
  
      try {
          if (chainId === testnetVestingContract.chainId) {
              const contractInstance = new web3.eth.Contract(testnetVestingContract.abi, testnetVestingContract.contractAddress);
              return contractInstance;
  
          }
  
      } catch (err) {
          return err;
      }
  }
  
  export const getUserClaims = async (web3, chainId, account) => {
  
      try {
          let presaleInstance = await getPresaleContract(web3, chainId)
          let vestingArray = await presaleInstance.methods.getVestingId(account).call()
          let claims = []
          for (let i = 0; i < vestingArray.length; i++) {
              let claimData = await presaleInstance.methods.getUserVestingData(account, vestingArray[i]).call()
              console.log(claimData);
              let claimableAmount = await presaleInstance.methods.getClaimAmount(account, vestingArray[i]).call()
              console.log(claimableAmount);
              claimData["vestingId"] = vestingArray[i]
              claimData["lockedPeriod"] = claimData[8]
              claimData["slice"] = claimData[9]
              claimData["totalEligible"] = claimData[3]
              claimData["remainingBalTokens"] = claimData[5]
              claimData["totalClaimed"] = claimData[4]
              claimData["claimableAmount"] = claimableAmount
              claims.push(claimData);
          }
          return claims;
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  const getTokenContract = async (web3, chainId) => {
      try {
          if (chainId === testnetPresale.chainId) {
              const contractInstance = new web3.eth.Contract(testnetTokenContract.abi, testnetTokenContract.contractAddress);
              return contractInstance;
  
          }
  
      } catch (err) {
          return err;
      }
  }
  
  // const getTokenBalance = async (account) => {
  //     try {
  //         let tokenInstance = await getTokenContract(web3Rpc, chainId)
  //         let balance = await tokenInstance.methods.balanceOf(account).call()
  //         let decimals = await getTokenDecimals()
  //         return Number(balance) / 10 ** decimals;
  //     } catch (error) {
  //         console.log(error);
  //         return error
  //     }
  // }
  
  export const getClaim = async (web3, chainId, account, vestingId) => {
      try {
          let contractInstance = await getVestingContract(web3, chainId)
          let result = await contractInstance.methods.claim(account, vestingId).send({ from: account })
          return result
  
      } catch (error) {
          console.log(error)
          return error;
      }
  }
  
  export const approveBUSD = async (web3, chainId, account, amount) => {
    
      try {
          let contractInstance = await getBUSDContract(web3, chainId)
          console.log('test',web3Rpc.utils.toWei(amount.toString(), "ether"));
          let result = await contractInstance.methods.approve(testnetPresale.contractAddress, 
              web3Rpc.utils.toWei(amount.toString(), "ether")).send({ from: account });
          return result;
      } catch (error) {
          console.log(error)
          return error
      }
  }
  
  export const buyTokenBUSD = async (web3, chainId, account, usdAmount) => {
      debugger
      try {
          let contractInstance = await getPresaleContract(web3, chainId)
          let result = await contractInstance.methods.buyTokenBUSD(2, web3Rpc.utils.toWei(usdAmount)).send({ from: account });
          return result;
      } catch (error) {
          console.log(error)
          return error
      }
  }
  
  export const getAllowance = async (web3, chainId, account) => {
  
      try {
          let contractInstance = await getBUSDContract(web3, chainId)
          let result = await contractInstance.methods.allowance(account, testnetPresale.contractAddress).call();
          // let decimals = await getTokenDecimals()
          return Number(result) / 1e18;
      } catch (error) {
          console.log(error)
          return error
      }
  
  }
  
  export const getBUSDBalance = async (account) => {
      try {
          let tokenInstance = await getBUSDContract(web3Rpc, chainId)
          let balance = await tokenInstance.methods.balanceOf(account).call()
          let decimals = await tokenInstance.methods.decimals().call()
          decimals = Number(decimals)
          return Number(balance) / 10 ** decimals;
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  
  export const getVCXBalance = async (account) => {
      try {
          let tokenInstance = await getTokenContract(web3Rpc, chainId)
          let balance = await tokenInstance.methods.balanceOf(account).call()
          let decimals = await getTokenDecimals()
          console.log(Number(balance))
          return Number(balance) / 10 ** decimals;
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  export const getRoundData = async () => {
      try {
  
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let currentRound = await contractInstance.methods.getCurrentRound().call();
          let result = await contractInstance.methods.getRoundData(currentRound).call();
          return result[1];
  
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  export const getCurrentRoundData = async () => {
      try {
  
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.getCurrentRound().call();
          return result;
  
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  export const getUsersInvestments = async (address) => {
      try {
  
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let result = await contractInstance.methods.userPurchased(address).call();
          return result / 1e9;
  
      } catch (error) {
          console.log(error);
          return error
      }
  }
  
  
  
  export const getMaxAndMinBUSDLimit = async () => {
      try {
          let contractInstance = await getPresaleContract(web3Rpc, chainId)
          let roundId = await contractInstance.methods.getCurrentRound().call();
          let maxEth = await contractInstance.methods.getMaxAmount(roundId).call();
          let minEth = await contractInstance.methods.getMinAmount(roundId).call();
          let maxBUSD = await contractInstance.methods.maxBUSDLimit(roundId).call();
          let minBUSD = await contractInstance.methods.minBUSDLimit(roundId).call();
  
          return { "maxEth": maxEth, "minEth": Number(minEth) + 100000000000000, "maxBUSD": maxBUSD, "minBUSD": minBUSD };
  
  
      } catch (error) {
          console.log(error);
          return error
      }
  }