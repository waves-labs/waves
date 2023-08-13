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

const domain = window.location.host;
const origin = window.location.origin;

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

      const nonceRes = await apiClient.get(`/identity/nonce`);

      const nonce = await nonceRes.data;

      console.log("NONCE", nonce);
      console.log("ADDRESS", address);
      console.log("CHAIN ID", chainId);

      const message = await createSiweMessage(
        address,
        "Login WAVES by Synesthesia",
        nonce,
        chainId,
      );

      const signature = await signMessage(message);

      await apiClient.post(`/identity/login`, {
        body: {
          message,
          signature,
        },
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
    login,
    logout,
  };
};
