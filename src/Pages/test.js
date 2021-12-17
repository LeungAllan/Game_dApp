import { utils } from "ethers";
import { useEthers, useContractCalls } from "@usedapp/core";
import { useState, useEffect, useCallback } from "react";
import abiJSON from "../Contract/NFTContract.json";
import classes from "./Page.module.css";

const abi = new utils.Interface(abiJSON);

const Testapp = () => {
  const [address] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");
  const { account } = useEthers();
  const [ state, setState ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tokenIDs] = useContractCalls([
    {
      abi,
      address,
      method: "walletOfOwner",
      args: [account]
    }
  ]);;

  const transformdata = useCallback(() => {
    setIsLoading(true);
    
    try {
      if (JSON.stringify(tokenIDs, ["hex"]) !== "") {
        const data = JSON.stringify(tokenIDs, ["hex"])
          .replace(/{"hex":/g, "")
          .replace(/}/g, "")
          .replace(/\[\[/g, "")
          .replace(/\]\]/g, "");

        const DataAry = data.split(",");
        const DataAry2 = [];

        DataAry2.push(
          DataAry.map((item) => {
            return parseInt(item.substring(3, item.length - 1), 16);
          })
        );

        setState(JSON.stringify(DataAry2));
    }} catch (error){
      setError(error.message);
    };
    setIsLoading(false);
  },[setState, tokenIDs]);

  useEffect(() => {
    transformdata();
  }, [state, transformdata]);


  let content = "No Record";
  let content2 = [];
  
  if (error) {
    content = <p>{error}</p>;
  }
  
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (state!==null) {
    content = state;
    content2 = state.replace(/\[\[/g, "").replace(/\]\]/g, "").split(",");

  };

  return (
    <div className={classes.NFTList}>
      {content}
      <p>{content2[0]}</p>
      <p>{content2[1]}</p>
      <p>{content2[2]}</p>
      <p>{content2[3]}</p>
      <p>{content2[4]}</p>
      <p>{content2[5]}</p>
    </div>
  );
};

export default Testapp;
