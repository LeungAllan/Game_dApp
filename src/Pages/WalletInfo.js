import { Fragment } from "react";
import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { formatEther, formatUnits } from "@ethersproject/units";
import classes from "./Page.module.css";
import NFT from "./NFT";

const Balance = () => {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const SmileBalance = useTokenBalance('0x65254Be8519e97DB783d0FfDE6646E104c5277a5', account)/100000000000;


  return (
    <Fragment>
    <div className={classes.summary}>
      <h2> My Wallet Information</h2>
      <h3>This page can show connected wallet stocks: Ethers, Matic, Smilecoin</h3>

      <div>
        <h3>{account && <p>Account: {account}</p>}</h3>
        <h3>Ethers: {etherBalance ? formatEther(etherBalance) : 0 } {(chainId===1 || chainId===4 )&& "ETH"}{chainId===137 && "MATIC"}</h3>
        <h3>Smiles: {SmileBalance ? formatUnits(SmileBalance, 6).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0 }</h3>
        {chainId!==4 && <font class="errortext">Please change to use Rinkeby</font>}
      </div>
    </div>
    <NFT />
    </Fragment>
  );
};

export default Balance;
