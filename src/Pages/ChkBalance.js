import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

const Balance = () => {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <div >
      <h1> Balance Page</h1>
      <h2>Show connected wallet ETH / Matic Balance</h2>

      <div>
        {account && <p>Account: {account}</p>}
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
        <p> Chain ID : {chainId}</p>
      </div>
    </div>
  );
};

export default Balance;
