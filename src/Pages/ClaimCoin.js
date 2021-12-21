import React, { useState } from "react";
import { shortenAddress } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import {
  ChainId,
  getExplorerTransactionLink,
  useContractFunction,
  useContractCalls,
  useEthers
} from "@usedapp/core";
import coinJSON from "../Contract/CoinContract.json";
import nftJSON from "../Contract/NFTContract.json";
import classes from "./Page.module.css";

const CoinABI = new Interface(coinJSON);
const Coincontract = new Contract(
  "0x8ddEb68dDa25B11b0a187E1366b65D21f3b5C5d8",
  CoinABI
);

const ClaimCoin = () => {
  
   const { send, state } = useContractFunction(
    Coincontract,
    "transfer"
  );
  
  const { account, chainId } = useEthers();
  const [ShowError, SetShowError] = useState(false);
  const abi = new Interface(nftJSON);
  const [address] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");

  // Check Balance of NFT => Calc how many token can claim
  const [tokenName, tokenBalance] = useContractCalls([
    {
      abi,
      address,
      method: "name",
      args: []
    },
    {
      abi,
      address,
      method: "balanceOf",
      args: [account]
    }
  ]);

  function shortenTransactionHash(hash) {
    return hash.substr(0, 6) + "..." + hash.substr(-4);
  }

  
  let ClaimQty = tokenBalance * 1000; // 1 NFT => can claim 1000 smilecoin

  const RunClaim = () => {
    if (tokenBalance>0) {

      send(account, ClaimQty);
      state.status = "";
      SetShowError(true);
      ClaimQty=0;
    }
  };

  return (
    <div className={classes.summary}>
      <h2> Claim Smilecoin </h2>
      <p>Connected Account : {account && shortenAddress(account)}</p>
      {state.status === "None" && <></>}
      {state.status === "Exception" && (
        <>
          {ShowError && (
            <h2>Transaction Failure，Parameters are not correct!</h2>
          )}
          <p>{ShowError && state.errorMessage}</p>
        </>
      )}
      {state.status === "Mining" && (
        <div className={classes.summary}>
          <h2>
            Transaction in Progress
            <br />
            <a
              href={getExplorerTransactionLink(
                state.transaction.hash,
                ChainId.Rinkeby
              )}
            >
              {shortenTransactionHash(state.transaction.hash)}
            </a>
          </h2>
        </div>
      )}
      {state.status === "Success" && (
        <div className={classes.summary}>
          {ShowError && (
            <h2>
              Transaction Success!
              <br />
              <a
                href={getExplorerTransactionLink(
                  state.transaction.hash,
                  ChainId.Rinkeby
                )}
              >
                {shortenTransactionHash(state.transaction.hash)}
              </a>
              <p>Block Number = {state.receipt.blockNumber}</p>
            </h2>
          )}
        </div>
      )}
      {state.status === "Fail" && (
        <div className={classes.summary}>
          <h2>Transaction Fail!</h2>
          <p>
            <a
              href={getExplorerTransactionLink(
                state.transaction.hash,
                ChainId.Rinkeby
              )}
            >
              {shortenTransactionHash(state.transaction.hash)}{" "}
            </a>
          </p>
          <p>Block Number = {state.receipt.blockNumber}</p>
        </div>
      )}
      <div>
        <p>NFT Name：{tokenName}</p>
        <p>Network ID = {chainId}</p>
      </div>
      
      {(chainId === 4)  && (
        <div>
          <p>You can claim Smilecoin {ClaimQty}  pcs.</p>
          {tokenBalance>0 ? <button onClick={RunClaim}>Claim Smilecoin</button>:""}
        </div>
      )}
      {chainId !== 4 && (
        <div>
          <p>Sorry, this feature is only support Rinkeby!</p>
          <p>Please change to Rinkeby network.</p>
        </div>
      )}
    </div>
  );

};
export default ClaimCoin;
