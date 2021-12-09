import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { formatEther, formatUnits } from "@ethersproject/units";

const Balance = () => {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const SmileBalance = useTokenBalance('0x65254Be8519e97DB783d0FfDE6646E104c5277a5', account)/100000000000;


  return (
    <div >
      <h1> Balance Page</h1>
      <h2>Show connected wallet ETH / Matic Balance</h2>

      <div>
        {account && <p>Account: {account}</p>}
        <h3>Ethers: {etherBalance ? formatEther(etherBalance) : 0 } {(chainId===1 || chainId===4 )&& "ETH"}{chainId===137 && "MATIC"}</h3>
        <h3>Smiles: {SmileBalance ? formatUnits(SmileBalance, 6).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0 }</h3>
        {chainId!==4 && <font class="errortext">Please change to use Rinkeby</font>}
        
        

      </div>
    </div>
  );
};

export default Balance;
