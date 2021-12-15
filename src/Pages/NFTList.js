//import { utils } from "ethers";
//import { useContractCalls } from "@usedapp/core";
import { useState, useEffect, useCallback } from "react";
import classes from "./Page.module.css";
import NFTCard from "./NFTCard";
//import abiJSON from "../Contract/NFTContract.json";
//const abi = new utils.Interface(abiJSON);

const NFTList = () => {
  //  const [address] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");

  // 可以用 useContractCalls 來打包
  /*
  const [tokenURI] = useContractCalls([
    {
      abi,
      address,
      method: "tokenURI",
      args: [props.id]
    }
  ]);
*/

  const [NFTlist, setNFTlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMetaData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://gateway.pinata.cloud/ipfs/QmSxEKQTMX7xYXEVb84L9vgY13Wvy6UTPT2VsKpdJdzShj/HEROMIX_0001.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedMeta = [];

      for (const key in data) {
        loadedMeta.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          image: data[key].image
        });
      }

      setNFTlist(loadedMeta);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getMetaData();
  }, [getMetaData]);

  let content = <p>Found no movies.</p>;

  if (NFTlist.length > 0) {
    content = <NFTCard nfts={NFTlist} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return <div className={classes.summary}>{content}</div>;
};

export default NFTList;
