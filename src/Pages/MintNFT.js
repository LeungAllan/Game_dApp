import { Contract } from '@ethersproject/contracts';
import { Interface } from '@ethersproject/abi';
import { ChainId, getExplorerTransactionLink, useContractFunction, useEthers } from '@usedapp/core';
import abiJSON from "../Contract/NFTContract.json";
import classes from "./Page.module.css";

const NFTABI = new Interface(abiJSON);
const NFTcontract = new Contract('0x412364A058d8A7D33517D312A78b3de2174601c0', NFTABI);

const ClaimCoin =(props) => {
    const { send, state } = useContractFunction(NFTcontract, 'mint');
    const { account } = useEthers();

    function shortenTransactionHash(hash) {
      return hash.substr(0, 6) + '...' + hash.substr(-4)
    }

    const RunMint= () => {
        send(1);
    }

    return (
        <div className={classes.summary}>
          <h2> Mint NFT </h2>
          <p>Connected Account : {account}</p>
          { state.status === 'None' && <></> }
          { state.status === 'Exception' && <><h2>交易失敗，參數不正確</h2><p>{state.errorMessage}</p></> }
          { state.status === 'Mining' && 
          <div className={classes.summary}>
            <h2>Transaction in Progress<br />
              <a href={getExplorerTransactionLink(state.transaction.hash, ChainId.Rinkeby)}>
                { shortenTransactionHash(state.transaction.hash) }
              </a>
            </h2>
            </div>
          }
          { state.status === 'Success' &&
          <div className={classes.summary}>
            <h2>Transaction Success!<br />
              <a href={getExplorerTransactionLink(state.transaction.hash, ChainId.Rinkeby)}>
                { shortenTransactionHash(state.transaction.hash) }
              </a>
              Block Number = { state.receipt.blockNumber }
            </h2>
            </div>
          }
          { state.status === 'Fail' &&
          <div className={classes.summary}>
            <h2>Transaction Fail!</h2>
            <p><a href={getExplorerTransactionLink(state.transaction.hash, ChainId.Rinkeby)}>
                { shortenTransactionHash(state.transaction.hash) } </a></p>
            <p>Block Number =  { state.receipt.blockNumber }</p>
          </div>
          }
          
          <button onClick={RunMint}>Mint 1 NFT</button>
        </div>
      );

};
export default ClaimCoin;