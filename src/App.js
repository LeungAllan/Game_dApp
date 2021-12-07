import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./Pages/Home";
import About from "./Pages/About";
import Balance from "./Pages/ChkBalance";
import ItemList from "./Pages/ItemList";
import Reward from "./Pages/Reward";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Balance" element={<Balance />} />
          <Route path="/ItemList" element={<ItemList />} />
          <Route path="/Reward" element={<Reward />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
