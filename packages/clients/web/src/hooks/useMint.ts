import {
  useAccount,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
} from "@apollo/client";
import { WriteContractResult } from "wagmi/actions";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import abi from "../abi/MinterDAExpV4.json";
import { GET_STATS } from "../modules/apollo";

interface SynthesizeHookData {
  address?: `0x${string}`;
  stats?: StatsQuery;
  transactionHash: string | null;
  // error: string | null;
  getStats: LazyQueryExecFunction<{ stats: StatsQuery }, OperationVariables>;
  writeAsync?: () => Promise<WriteContractResult>;
  openConnectModal?: () => void;
  disconnectAsync: () => Promise<void>;
}

export const useMint = (): SynthesizeHookData => {
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const [getStats, { data }] = useLazyQuery<{ stats: StatsQuery }>(GET_STATS, {
    variables: {
      address: import.meta.env.DEV
        ? "0x66028fcf07beee3eee2a24beab52914ae66cd3e9"
        : address,
    },
    refetchWritePolicy: "merge",
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    // pollInterval: 10000,
  });
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_VERCEL_ARTBLOCKS_CONTRACT_ADDRESS ?? "0x",
    abi,
    functionName: "purchase",
    args: [
      import.meta.env.VITE_VERCEL_ARTBLOCKS_PROJECT_ID ?? "0",
      data?.stats?.genres,
    ],
  });
  const { data: mint, writeAsync } = useContractWrite(config);
  const {} = useWaitForTransaction({
    hash: mint?.hash,
  });

  return {
    stats: data?.stats,
    address,
    transactionHash: mint?.hash ?? null,
    getStats,
    writeAsync,
    disconnectAsync,
    openConnectModal,
  };
};