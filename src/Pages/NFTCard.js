import React from "react";
import classes from "./Page.module.css";

const NFTCard = (props) => {
  return (
    <ul >
      {props.nfts.map((nft) => ( 
        <div className={classes.NFTCard}>
          <table border='0'>
            <tr><td rowspan='3' ><img src={nft.image} alt="NFT" width="100" /></td>
              <td width="100px" valign="top" align="right">Name :</td>
              <td valign="top" align="left">{nft.name}</td>
             </tr>
            <tr>
              <td valign="top" align="right">Description :</td>
              <td valign="top" align="left">{nft.description}</td>
            </tr>
          </table>
        </div>
        
      ))}
    </ul>
  );
};

export default NFTCard;
