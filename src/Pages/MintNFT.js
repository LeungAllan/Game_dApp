import React, { useState } from "react";
import { utils } from "ethers";
import { shortenAddress } from "@usedapp/core";
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

const MintNFT = (props) => {
  const { send, state } = useContractFunction(NFTcontract, "mint");
  const { account, chainId } = useEthers();
  const [ShowError, SetShowError] = useState(false);

  function shortenTransactionHash(hash) {
    return hash.substr(0, 6) + "..." + hash.substr(-4);
  }

  let MintCost = "0.05";

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
  let SendCost = (MintCost * ClaimQty).toFixed(2);
  if (chainId === 137) {
    SendCost = (SendCost * 1809).toString();
  }
  const RunMint = () => {
    send(ClaimQty, { value: utils.parseEther(SendCost) });
    state.status = "";
    SetShowError(true);
  };

  return (
    <div className={classes.summary}>
      <h2> Mint NFT </h2>
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
        <p>Network ID = {chainId}</p>
      </div>
      {(chainId === 1 || chainId === 4) && (
        <div>
          <p>Cost per NFT = {MintCost} ETH</p>
          <p>Total Cost = {(MintCost * ClaimQty).toFixed(2)} ETH</p>
          <button onClick={AddQty}> + 1</button>
          <button onClick={RunMint}>Mint {ClaimQty} NFT</button>
          <button onClick={MinusQty}> - 1</button>
        </div>
      )}
      {chainId === 137 && (
        <div>
          <p>Cost per NFT = {MintCost * 1809} MATIC</p>
          <p>Total Cost = {(MintCost * ClaimQty * 1809).toFixed(2)} MATIC</p>
          <button onClick={AddQty}> + 1</button>
          <button onClick={RunMint}>Mint {ClaimQty} NFT</button>
          <button onClick={MinusQty}> - 1</button>
        </div>
      )}
    </div>
  );
};
export default MintNFT;
