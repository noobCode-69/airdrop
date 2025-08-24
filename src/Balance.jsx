import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function ShowSolBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallet.publicKey) {
        setBalance(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const lamports = await connection.getBalance(wallet.publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch balance.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();

    // Refresh balance automatically every 20s while wallet is connected
    const interval = setInterval(fetchBalance, 20000);
    return () => clearInterval(interval);
  }, [wallet.publicKey, connection]);

  if (!wallet.connected) {
    return <p className="text-gray-500">Connect your wallet to see balance.</p>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm w-fit bg-white">
      <p className="font-medium">SOL Balance</p>
      {loading ? (
        <p className="text-gray-500">Fetching...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p className="text-lg font-bold">{balance ?? 0} ◎</p>
      )}
      <button
        onClick={async () => {
          if (wallet.publicKey) {
            setLoading(true);
            try {
              const lamports = await connection.getBalance(wallet.publicKey);
              setBalance(lamports / LAMPORTS_PER_SOL);
            } catch {
              setError("Failed to refresh balance.");
            } finally {
              setLoading(false);
            }
          }
        }}
        disabled={loading}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}

export default ShowSolBalance;
