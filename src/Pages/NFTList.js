//import { utils } from "ethers";
//import { useEthers, useContractCalls } from "@usedapp/core";
import { useState, useEffect, useCallback } from "react";
import classes from "./Page.module.css";
import NFTCard from "./NFTCard";
//import abiJSON from "../Contract/NFTContract.json";
//const abi = new utils.Interface(abiJSON);

const NFTList = () => {
  //const [address] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");
  //const { account } = useEthers();

  // 可以用 useContractCalls 來打包
  /*
  const [tokenIDs] = useContractCalls([
    {
      abi,
      address,
      method: "walletOfOwner",
      args: [account]
    }
  ]);
  const tokenID = JSON.stringify(tokenIDs);
  */

  const [tokenID] = useState([1,2]);
  const [NFTlist, setNFTlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMetaData = useCallback( () => {
    setIsLoading(true);
    setError(null);
   
    const tokenURI = tokenID.map((number) => {
      const id ="0000" + number;
      return (
      "https://gateway.pinata.cloud/ipfs/QmSxEKQTMX7xYXEVb84L9vgY13Wvy6UTPT2VsKpdJdzShj/HEROMIX_" + id.substr(id.length - 4 ) + ".json"
      );
    });

    const loadedMeta = [];

    tokenURI.map(async (token) => {
    try {
      /*
      const response = await fetch(
        "https://gateway.pinata.cloud/ipfs/QmSxEKQTMX7xYXEVb84L9vgY13Wvy6UTPT2VsKpdJdzShj/HEROMIX_0001.json"
      );
      */
      
        const response = await fetch(token);
     
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
    
      for (const key in data) {
        loadedMeta.push({
          id: key,
          name: data.name,
          description: data.description,
          image: data.image
        });
      }
      const uniqueloadedMeta = loadedMeta.filter((name,index) => {
        const _record = JSON.stringify(name);
        return index === loadedMeta.findIndex( obj => {
          return JSON.stringify(obj) === _record;
        });
      });

      setNFTlist(uniqueloadedMeta);
    } catch (error) {
      setError(error.message);
    }
  });
    setIsLoading(false);
  }, [tokenID]);

  useEffect(() => {
      getMetaData();
  }, [getMetaData]);

  let content = <p>Found no movies.</p>;

  if (NFTlist.length > 0) {
    content = <NFTCard nfts={NFTlist } />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return <div className={classes.NFTList}>{content}</div>;
};

export default NFTList;
