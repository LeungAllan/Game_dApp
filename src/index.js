import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";
import App from "./App";

import Header from "./Pages/Header";
import { DAppProvider, ChainId, Config } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby
  //readOnlyUrls: {
  //  [ChainId.Mainnet]:
  //    "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934"
  //}
};

ReactDOM.render(
  <DAppProvider config={config}>
    <Provider store={store}>
      <Header />
      <App />
    </Provider>
  </DAppProvider>,
  document.getElementById("root")
);
