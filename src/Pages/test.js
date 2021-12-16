import {  utils, BigNumber } from "ethers";
import { useEthers, useContractCalls } from "@usedapp/core";
import react,{ useState, Component } from "react";
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
  function hex_to_ascii(str1)
  {
   var hex  = str1.toString();
   var str = '';
   for (var n = 0; n < hex.length; n += 2) {
     str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
   }
   return str;
  }
  function replacer(key, value) {
    if(typeof key === "hex") {
      return value;
    }
    //const newvalue = value.replace(/{"hex":/g,'').replace(/}/g,'').replace(/\[\[/g,'[').replace(/\]\]/g,']');
    //const newvalue2 = hex_to_ascii(newvalue);
    return undefined;
  };

  //const data = JSON.stringify(tokenIDs,['hex'])
  const data = JSON.stringify(tokenIDs,['hex']).replace(/{"hex":/g,'').replace(/}/g,'').replace(/\[\[/g,'').replace(/\]\]/g,'');
  //const data2 = JSON.stringify(tokenIDs, replacer());

  const DataAry = data.split(',');
  const DataAry2 = DataAry.map((item) => {
    return parseInt( item.substring(3,item.length-1),16);
  });
  

  return (
  <div className={classes.NFTList}>
      <p>Data: {data}</p>
      <p>====</p>
      
      <p> Data ARy in Json : {JSON.stringify(DataAry2)}</p>
      <p>====</p>
      <p>{JSON.stringify(tokenIDs)}</p></div>);

};

export default Testapp;
