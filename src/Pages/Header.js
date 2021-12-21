import classes from "./Header.module.css";
import { useEthers } from "@usedapp/core";
import ConnectBtn from "../Components/ConnectButton";

const Header = () => {
  const { account } = useEthers();

  return (
    <header className={classes.header}>
      <h1>GameFi dApp</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home </a>
          </li>
          <li>
            <a href="/About">About Us</a>
          </li>
          <li>{account && <a href="/Wallet">My Wallet</a>}</li>
          <li>{account && <a href="/Mint">Mint </a>}</li>
          <li>{account && <a href="/Claim">Claim </a>}</li>

          <li>
            <ConnectBtn />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
