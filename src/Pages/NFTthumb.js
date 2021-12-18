import React from "react";

import classes from "./Page.module.css";

const NFTthumb = (props) => {
  return (
    <div className={classes.NFTthumb}>
      <a href="/ItemList">
      {props.nfts.map((nft) => ( 
            <img src={nft.image} alt="NFT" width="100" />
      ))}
      </a>
    </div>
  );
};

export default NFTthumb;
