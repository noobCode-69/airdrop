import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const isWalletConnected = wallet.connected;

  const requestAirdrop = async () => {
    if (amount <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount." });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL
      );

      setMessage({
        type: "success",
        text: `Airdrop successful! Signature: ${signature}`,
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.message || "Airdrop failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isWalletConnected) {
    return <div>Please first connect the wallet to request Airdrop</div>;
  }

  return (
    <div className="space-y-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border px-2 py-1 rounded"
        placeholder="Enter SOL amount"
        disabled={loading}
      />

      <button
        onClick={requestAirdrop}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "Requesting..." : "Airdrop"}
      </button>

      {message && (
        <div
          className={`p-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
