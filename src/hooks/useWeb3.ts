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
      }

      const nonceRes = await apiClient.get(`/user/identifier/nonce`, {});

      const nonce = await nonceRes.data;

      const message = new SiweMessage({
        address,
        chainId,
        nonce,
        domain: window.location.host,
        statement: "Authenticate with WEFA to access AI powered services.",
        uri: window.location.origin,
        version: "0.0.0",
      });
      const signature = signMessage(message.prepareMessage());

      await apiClient.post(`/user/identifier/login`, {
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
      await apiClient.post(`/user/logout`);
    } catch (err: any) {
      err && err.message && setError(err.message);
      console.error("ERROR DICONNECTING WALLET", err);
    }
  }

  useEffect(() => {
    if (address && !connectModalOpen) {
      login();
    }
  }, [address]);

  useEffect(() => {
    if (connectError) {
      setError(connectError.message);
    }
  }, [connectError]);

  return {
    error,
    address,
    login,
    logout,
  };
};
