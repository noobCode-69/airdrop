import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

import Airdrop from "./Airdrop.jsx";
import ShowSolBalance from "./Balance.jsx";
import Send from "./Send.jsx";

function App() {
  return (
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com/"}>
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            <Airdrop />
            <ShowSolBalance />
            <Send />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
