import React, { useEffect } from "react";
import classes from "./Page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import { Provider } from "react-redux";
import store from "../redux/store";


const NFTList =() => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
  
    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch, blockchain.account]);
  

    return (
        <Provider store={store}>
        <div classname={classes.summary}>
            <p className="errortext"> {blockchain.errorMsg}</p>
            Name: {data.name}
            <button onclick={(e)=>{
                e.preventDefault();
                dispatch(connect());
            }}>Connect</button>
            <p>{blockchain.smartContract}</p>
        </div>
        </Provider>
    )
        
    
};

export default NFTList;
