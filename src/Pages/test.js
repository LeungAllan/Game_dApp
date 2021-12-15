import { utils } from "ethers";
import { useEthers, useContractCalls } from "@usedapp/core";
import { useState } from "react";
import abiJSON from "../Contract/NFTContract.json";
import classes from "./Page.module.css";
const abi = new utils.Interface(abiJSON);

const Testapp = () => {
  const [ address ] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");
  const { account } = useEthers();

  // 可以用 useContractCalls 來打包
  
 const [tokenIDs] = useContractCalls([
    {
      abi,
      address,
      method: "walletOfOwner",
      args: [account]
    }
  ]);


  const data = JSON.stringify(tokenIDs);
/*
  const test2 = data.replace(/"type":"BigNumber","hex":/g, '');
  const test3 = test2.replace(/\[{/g,'');
  const test4 = test3.replace(/\{\}/g,'');
*/

  return <div className={classes.NFTList}>{data}<p>====</p><p>{JSON.stringify(tokenIDs)}</p></div>;

};

export default Testapp;
