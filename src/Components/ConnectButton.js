import { useEthers } from "@usedapp/core";
import { useEffect } from "react";

const ConnectBtn = () => {
  const { activateBrowserWallet, deactivate, account, error } = useEthers();
  useEffect(()=>{
    if (error) alert(error);
  }, [error]);

  return account ? (
    <div>
      <button onClick={deactivate}>
        {account &&
          `${account.slice(0, 6)}...${account.slice(
            account.length - 4,
            account.length
          )}`}
      </button>
    </div>
  ) : (
    <div>
      <button onClick={activateBrowserWallet}>Connect</button>
    </div>
  );
};

export default ConnectBtn;
