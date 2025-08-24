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

function App() {
  return (
    <>
      <ConnectionProvider
        endpoint={
          "https://solana-devnet.g.alchemy.com/v2/jCVMNET8tlFdlYrs2lRiS"
        }
      >
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            <Airdrop />
            <ShowSolBalance />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
