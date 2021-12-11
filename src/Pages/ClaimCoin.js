import { Contract } from '@ethersproject/contracts';
import { Interface } from '@ethersproject/abi';
//import { utils } from 'ethers';
import { ChainId, getExplorerTransactionLink, useContractFunction, useEthers } from '@usedapp/core';
import abiJSON from "../Contract/CoinContract.json";
import classes from "./Page.module.css";
import { useEffect } from 'react';

//const CoinABI = new utils.Interface(abiJSON);
const CoinABI = new Interface(abiJSON);
const SmileCoin = new Contract('0x65254Be8519e97DB783d0FfDE6646E104c5277a5', CoinABI);
//const SmileCoinOwner = '0x8ddEb68dDa25B11b0a187E1366b65D21f3b5C5d8';


function shortenTransactionHash(hash) {
    return hash.substr(0, 6) + '...' + hash.substr(-4)
}


const ClaimCoin =(props) => {
    const { send, state } = useContractFunction(SmileCoin, 'transfer',SmileCoin);
    const { account } = useEthers();

    const RunClaim= () => {
        const CoinClaim = props.QtyClaim * 1000000;
        //SetApprove(CoinClaim);

        //send( account , CoinClaim);
        // '0x000000000000000000000000000000000000dead' - burn
        //send('0x000000000000000000000000000000000000dead' , CoinClaim);
    }

    return (
        <div>
          { state.status === 'None' && <></> }
          { state.status === 'Exception' && <div className={classes.summary}><font class="errortext"> <h2>交易失敗，參數不正確</h2><p>{state.errorMessage}</p> </font></div>}
          { state.status === 'Mining' && 
          <div className={classes.summary}>
            <h2>交易進行中<br />
              <a href={getExplorerTransactionLink(state.transaction.hash, ChainId.Rinkeby)}>
                { shortenTransactionHash(state.transaction.hash) }
              </a>
            </h2>
            </div>
          }
          { state.status === 'Success' &&
          <div className={classes.summary}>
            <h2>交易成功<br />
              <a href={getExplorerTransactionLink(state.transaction.hash, ChainId.Rinkeby)}>
                { shortenTransactionHash(state.transaction.hash) }
              </a>
              位於 { state.receipt.blockNumber }
            </h2>
            </div>
          }
          { state.status === 'Fail' &&
          <div className={classes.summary}>
            <h2>交易失敗<br />
              <a href={getExplorerTransactionLink(state.transaction.hash, ChainId.Rinkeby)}>
                { shortenTransactionHash(state.transaction.hash) } 
              </a>
              位於 { state.receipt.blockNumber }
            </h2>
            </div>
          }
          <button onClick={RunClaim()}>Claim {props.QtyClaim} SmileCoin</button>
        </div>
      );

};
export default ClaimCoin;