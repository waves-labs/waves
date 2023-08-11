import {
  useAccount,
  useDisconnect,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import { WriteContractResult } from "wagmi/actions";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import abi from "../abi/MinterDAExpV4.json";

interface SynthesizeHookData {
  address?: `0x${string}`;
  transactionHash: string | null;
  writeAsync?: () => Promise<WriteContractResult>;
  openConnectModal?: () => void;
  disconnectAsync: () => Promise<void>;
}

export const useMint = (): SynthesizeHookData => {
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_VERCEL_ARTBLOCKS_CONTRACT_ADDRESS ?? "0x",
    abi,
    functionName: "purchase",
    args: [
      import.meta.env.VITE_VERCEL_ARTBLOCKS_PROJECT_ID ?? "0",
      // data?.stats?.genres,
    ],
  });
  const { data: mint, writeAsync } = useContractWrite(config);
  const {} = useWaitForTransaction({
    hash: mint?.hash,
  });

  return {
    address,
    transactionHash: mint?.hash ?? null,
    writeAsync,
    disconnectAsync,
    openConnectModal,
  };
};
