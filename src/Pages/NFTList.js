import { utils } from "ethers";
import { useEthers, useContractCalls } from "@usedapp/core";
import { useState, useEffect, useCallback } from "react";
import classes from "./Page.module.css";
import NFTCard from "./NFTCard";
import abiJSON from "../Contract/NFTContract.json";
const abi = new utils.Interface(abiJSON);

const NFTList = () => {
  const [address] = useState("0x412364A058d8A7D33517D312A78b3de2174601c0");
  const { account } = useEthers();
  const [Arystate, setAryState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 可以用 useContractCalls 來打包
  const [tokenIDs] = useContractCalls([
    {
      abi,
      address,
      method: "walletOfOwner",
      args: [account]
    }
  ]);

  // Transform tokenID to array for display
  const transformdata = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      /*
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
        */
      const DataAry2 = [];
      DataAry2.push(
        tokenIDs.map((item) => {
          return item * 1;
        })
      );

      setAryState(JSON.stringify(DataAry2));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [setAryState, tokenIDs]);

  // Sample tokenID for test only
  //const [tokenID] = useState([1,2]);
  const [NFTlist, setNFTlist] = useState([]);

  const getMetaData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    let tokenID = [];

    if (Arystate !== null) {
      tokenID = Arystate.replace(/\[\[/g, "").replace(/\]\]/g, "").split(",");

      const tokenURI = tokenID.map((number) => {
        //  const tokenURI = Arystate.map((number) => {
        const id = "0000" + number;
        return (
          "https://gateway.pinata.cloud/ipfs/QmSxEKQTMX7xYXEVb84L9vgY13Wvy6UTPT2VsKpdJdzShj/HEROMIX_" +
          id.substr(id.length - 4) +
          ".json"
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
            if (key === "description") {
              loadedMeta.push({
                id: key,
                name: data.name,
                description: data.description,
                image: data.image
              });
            }
          }

          const uniqueloadedMeta = loadedMeta.filter((name, index) => {
            const _record = JSON.stringify(name);
            return (
              index ===
              loadedMeta.findIndex((obj) => {
                return JSON.stringify(obj) === _record;
              })
            );
          });

          setNFTlist(uniqueloadedMeta);
        } catch (error) {
          setError(error.message);
        }
      });
    }
    setIsLoading(false);
    //}, [tokenID]);
  }, [Arystate]);

  useEffect(() => {
    transformdata();
    getMetaData();
  }, [getMetaData, transformdata, Arystate]);

  let content = "";

  if (NFTlist.length > 0) {
    content = <NFTCard nfts={NFTlist} />;
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
