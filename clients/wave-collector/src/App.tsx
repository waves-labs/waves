import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Appbar } from "./components/Layout/AppBar";
import { Header } from "./components/Layout/Header";
import Views from "./views";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <>
      <h1>Wave Collector</h1>

      {/** @see https://www.rainbowkit.com/docs/connect-button */}
      <ConnectButton />

      {isConnected && (
        <>
          <hr />
          {/* <Attestooooooor /> */}
          <hr />
        </>
      )}
    </>
  );
}
