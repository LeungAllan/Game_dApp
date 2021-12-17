import { utils } from "ethers";
import { useEthers, useContractCalls } from "@usedapp/core";
import { useState, useEffect, useCallback } from "react";
import abiJSON from "../Contract/NFTContract.json";
import classes from "./Page.module.css";

const abi = new utils.Interface(abiJSON);

const Testapp = () => {
  const [address] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");
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

  const testdata = JSON.stringify(tokenIDs, ["hex"]);
  const { state, setState } = useState(testdata);
  const DataAry2 = [];
  /*
  const transformdata = useCallback(() => {
    if (testdata !== "") {
      console.log(testdata);
      const data = testdata
        .replace(/{"hex":/g, "")
        .replace(/}/g, "")
        .replace(/\[\[/g, "")
        .replace(/\]\]/g, "");

      const DataAry = data.split(",");
      DataAry2.push(
        DataAry.map((item) => {
          return parseInt(item.substring(3, item.length - 1), 16);
        })
      );
    }
  }, [testdata, DataAry2]);

  useEffect(() => {
    transformdata();
  }, [transformdata]);
*/
  return (
    <div className={classes.NFTList}>
      <p>Data: {testdata}</p>
      <p>====</p>
      <p> Data ARy in Json : {DataAry2}</p>: <p> No Record </p>}<p>====</p>
      <p>{JSON.stringify(tokenIDs)}</p>
    </div>
  );
};

export default Testapp;
