import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import WalletInfo from "./Pages/WalletInfo";
import ItemList from "./Pages/NFTList";
import NFT from "./Pages/NFT";
import MintNFT from "./Pages/MintNFT";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Wallet" element={<WalletInfo />} />
        <Route exact path="/NFT" element={<NFT />} />
        <Route exact path="/ItemList" element={<ItemList />} />
        <Route exact path="/Mint" element={<MintNFT />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
