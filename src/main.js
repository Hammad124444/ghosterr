import React from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import '@rainbow-me/rainbowkit/styles.css'
import App from "./App";
function Main() {
  const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.goerli],
    [
      alchemyProvider({ apiKey: "ZbsqrRcpLefTHExSr5LgL6Bn1kTPuoYI" }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    // connectorsCustom,
    webSocketProvider,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Main;
