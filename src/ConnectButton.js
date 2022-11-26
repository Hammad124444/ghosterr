import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner } from "wagmi";
import { connect } from "./redux/blockchain/blockchainActions";
import { useDispatch } from "react-redux";
function Connect() {
  const { address } = useAccount();
  const { data: signerData } = useSigner();
  const dispatch = useDispatch();
  const FetchProvider = async () => {
    if (window.ethereum === undefined) {
      dispatch(
        connect(
          address,
          "https://goerli.infura.io/v3/7c2e17f55d4c47bc817e71fd81eee209"
        )
      );
    } else {
      dispatch(connect(address, window.ethereum));
    }
  };
  useEffect(() => {
    if (address) {
      FetchProvider();
    }
  }, [address]);
  useEffect(() => {
    console.log(signerData, "signersignersigner");
  }, [signerData]);
  return <ConnectButton />;
}

export default Connect;
