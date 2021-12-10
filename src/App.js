import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./Pages/Home";
import About from "./Pages/About";
import WalletInfo from "./Pages/WalletInfo";
import ItemList from "./Pages/ItemList";
import NFT from "./Pages/NFT";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Wallet" element={<WalletInfo />} />
          <Route path="/NFT" element={<NFT />} />
          <Route path="/ItemList" element={<ItemList />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
