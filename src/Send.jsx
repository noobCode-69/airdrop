import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

export default function Send() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleSend = async () => {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);

      let status = null;
      let retries = 30;
      while (retries > 0) {
        const { value } = await connection.getSignatureStatuses([signature]);
        status = value[0];

        if (status && status.confirmationStatus === "finalized") {
          alert(`✅ Transaction successful! Signature: ${signature}`);
          return;
        }

        if (status && status.err) {
          throw new Error("Transaction failed: " + JSON.stringify(status.err));
        }

        retries--;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      throw new Error("Transaction not confirmed in time");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div>
      <div>
        <label>
          To:{" "}
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Amount:{" "}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
