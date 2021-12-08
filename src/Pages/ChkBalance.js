import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { formatEther, formatUnits } from "@ethersproject/units";

const Balance = () => {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const NFTBalance = useTokenBalance(
    "0x748F4188BC18348315c423F03E065cfDBAef3b44",
    account
  );

  return (
    <div>
      <h1> Balance Page</h1>
      <h2>Show connected wallet ETH / Matic Balance</h2>

      <div>
        {account && <p>Account: {account}</p>}
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
        <p>HeroXYZ Balance: {NFTBalance ? formatUnits(NFTBalance, 6) : 0}</p>
        <p> Chain ID : {chainId}</p>
        {chainId !== 4 ? (
          <p class="errorText">
            We support Rinkeby network only, please change your network!
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Balance;
