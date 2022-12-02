import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import ConnectWalletBtn from "./components/ConnectWalletBtn";
import Home from "./components/Home";

type AppProps = any

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Mainnet}
    >
      <ConnectWalletBtn {...pageProps} />
      <Home />
    </ThirdwebProvider>
  );
}