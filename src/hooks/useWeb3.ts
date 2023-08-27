import {
  useConnect,
  useAccount,
  useChainId,
  useDisconnect,
  useSignMessage,
} from "wagmi";
import { SiweMessage } from "siwe";
import { useEffect, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { apiClient } from "../modules/axios";

const domain = document.location.host;
const origin = document.location.origin;

console.log("DOMAIN", domain);
console.log("ORIGIN", origin);

async function createSiweMessage(
  address: `0x${string}`,
  statement: string,
  nonce: string,
  chainId: number,
) {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId,
    nonce,
  });
  return message.prepareMessage();
}

export const useWeb3 = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { error: connectError } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const { openConnectModal, connectModalOpen } = useConnectModal();

  const [error, setError] = useState<null | string>(null);

  async function handleConnect(): Promise<void> {
    try {
      setError(null);
      openConnectModal?.();
    } catch (err: any) {
      err && err.message && setError(err.message);
      console.error("ERROR CONNECTING WALLET", err);
    }
  }

  async function signMessage(message: string): Promise<string | void> {
    try {
      setError(null);
      const msg = await signMessageAsync({ message });
      return msg;
    } catch (err: any) {
      err && err.message && setError(err.message);
      console.error("ERROR SIGNING MSG", err);
    }
  }

  async function login() {
    try {
      setError(null);

      if (!address) {
        await handleConnect();

        return;
      }

      const nonceRes = await apiClient.get<{ nonce: string }>(
        `/identity/nonce`,
      );

      const message = await createSiweMessage(
        address,
        "Enter WAVES",
        nonceRes.data.nonce,
        chainId,
      );
      const signature = await signMessage(message);

      await apiClient.post(`/identity/login`, {
        message,
        signature,
      });
    } catch (err: any) {
      err && err.message && setError(err.message);
      console.error("ERROR AUTHENTICATING", err);
    }
  }

  async function logout(): Promise<void> {
    try {
      setError(null);
      await disconnectAsync();
      await apiClient.post(`/identity/logout`);
    } catch (err: any) {
      err && err.message && setError(err.message);
      console.error("ERROR DICONNECTING WALLET", err);
    }
  }

  useEffect(() => {
    if (address && !connectModalOpen) {
      login();
    }
  }, [address, connectModalOpen]);

  useEffect(() => {
    if (connectError) {
      setError(connectError.message);
    }
  }, [connectError]);

  return {
    error,
    address,
    handleConnect,
    signMessage,
    login,
    logout,
  };
};
