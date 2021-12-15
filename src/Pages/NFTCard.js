import React from "react";

import classes from "./Page.module.css";

const NFTCard = (props) => {
  return (
    <li className={classes.NFTCard}>
      <h2>{props.nfts.name}</h2>
      <h3>{props.nfts.description}</h3>
      <p>{props.nfts.image}</p>
    </li>
  );
};

export default NFTCard;
