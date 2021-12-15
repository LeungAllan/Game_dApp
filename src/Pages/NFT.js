//import { Interface } from '@ethersproject/abi';
import { utils } from "ethers";
import { useContractCalls } from "@usedapp/core";
import { useState } from "react";
import { useEthers } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import classes from "./Page.module.css";
import abiJSON from "../Contract/NFTContract.json";
import ClaimCoin from "./ClaimCoin";

const abi = new utils.Interface(abiJSON);

export default function Contract() {
  const { account } = useEthers();
  const [address] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");

  // 可以用 useContractCalls 來打包
  const [tokenName, tokenDecimals, tokenBalance, tokencost] = useContractCalls([
    {
      abi,
      address,
      method: "name",
      args: []
    },
    {
      abi,
      address,
      method: "decimals",
      args: []
    },
    {
      abi,
      address,
      method: "balanceOf",
      args: [account]
    },
    {
      abi,
      address,
      method: "cost",
      args: []
    }
  ]);

  const tokenOwned = parseInt(Math.ceil(tokenBalance), 10);
  const tokenClaim = tokenOwned * 10;

  return (
    <div className={classes.summary}>
      <h2>NFT Contract Information</h2>
      <p>NFT Contract Address：{address}</p>
      <p>NFT Name：{tokenName}</p>

      {tokenBalance && (
        <div>
          <p>
            You have{" "}
            {Math.ceil(
              formatUnits(tokenBalance[0], tokenDecimals) * 1000000000000000000
            )}{" "}
            NFT
          </p>
          <p>Token Cost: {tokencost.toString()} wei / NFT</p>
        </div>
      )}
      <p> You can claim {tokenClaim} SmileCoins.</p>
      <ClaimCoin QtyClaim={tokenClaim} />
    </div>
  );
}
