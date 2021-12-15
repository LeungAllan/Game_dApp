import React, { useState } from "react";
import { utils } from "ethers";
import { useContractCall } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import {
  ChainId,
  getExplorerTransactionLink,
  useContractFunction,
  useEthers
} from "@usedapp/core";
import abiJSON from "../Contract/NFTContract.json";
import classes from "./Page.module.css";

const NFTABI = new Interface(abiJSON);
const NFTcontract = new Contract(
  "0x412364A058d8A7D33517D312A78b3de2174601c0",
  NFTABI
);

const ClaimCoin = (props) => {
  const { send, state } = useContractFunction(
    NFTcontract,
    "mint",
    utils.parseEther("1")
  );
  const { account } = useEthers();
  const [ShowError, SetShowError] = useState(false);

  function shortenTransactionHash(hash) {
    return hash.substr(0, 6) + "..." + hash.substr(-4);
  }

  const [address] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");
  const tokenCost = useContractCall([
    {
      NFTABI,
      address,
      method: "cost",
      args: []
    }
  ]);

  const [ClaimQty, setClaimQty] = useState(1);
  const AddQty = () => {
    setClaimQty(ClaimQty + 1);
    SetShowError(false);
  };
  const MinusQty = () => {
    if (ClaimQty > 0) {
      setClaimQty(ClaimQty - 1);
      SetShowError(false);
    } else {
      setClaimQty(0);
      SetShowError(false);
    }
  };
  const RunMint = () => {
    send(ClaimQty);
    SetShowError(true);
  };

  return (
    <div className={classes.summary}>
      <h2> Mint NFT </h2>
      <p>Connected Account : {account}</p>
      {state.status === "None" && <></>}
      {(state.status === "Exception" & ShowError)&& (
        <>
          {ShowError && <h2>交易失敗，參數不正確</h2>}
          <p>{ShowError && state.errorMessage}</p>
        </>
      )}
      {(state.status === "Mining" & ShowError) && (
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
      {(state.status === "Success" & ShowError) && (
        <div className={classes.summary}>
          {ShowError && <h2>Transaction Success!
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
          </h2>}
        </div>
      )}
      {(state.status === "Fail" & ShowError)&& (
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
      <p>Token Cost: {tokenCost} </p>
      <button onClick={AddQty}> + 1</button>
      <button onClick={RunMint}>Mint {ClaimQty} NFT</button>
      <button onClick={MinusQty}> - 1</button>
    </div>
  );
};
export default ClaimCoin;
