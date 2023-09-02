import {
  useConnect,
  useAccount,
  useChainId,
  useDisconnect,
  useSignMessage,
} from "wagmi";
import { SiweMessage } from "siwe";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { createContext, useContext, useEffect, useState } from "react";

import { apiClient } from "../modules/axios";

const domain = document.location.host;
const origin = document.location.origin;

export interface Web3Props {
  error: null | string;
  address?: `0x${string}`;
  handleConnect: () => Promise<void>;
  signMessage: (message: string) => Promise<string | void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

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

const Web3Context = createContext<Web3Props | null>(null);

type Props = {
  children: React.ReactNode;
};

export const Web3Provider = ({ children }: Props) => {
  const currentValue = useContext(Web3Context);

  if (currentValue) throw new Error("AppProvider can only be used once");

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true",
  );
  const [authenticating, setAuthenticating] = useState(false);

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
      if (authenticated || authenticating) {
        return;
      }

      setAuthenticating(true);
      setError(null);

      if (!address) {
        await handleConnect();

        setAuthenticating(false);

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

      await apiClient.post(
        `/identity/login`,
        {
          message,
          signature,
        },
        // {},
      );

      setAuthenticated(true);
      setAuthenticating(false);

      localStorage.setItem("authenticated", "true");
    } catch (err: any) {
      setAuthenticating(false);
      err && err.message && setError(err.message);
      console.error("ERROR AUTHENTICATING", err);
    }
  }

  async function logout(): Promise<void> {
    try {
      setError(null);
      await disconnectAsync();
      await apiClient.post(`/identity/logout`, {
        withCredentials: true,
      });

      localStorage.setItem("authenticated", "false");
    } catch (err: any) {
      err && err.message && setError(err.message);
      console.error("ERROR DICONNECTING WALLET", err);
    }

    setAuthenticated(false);
  }

  useEffect(() => {
    if (connectError) {
      setError(connectError.message);
    }
  }, [connectError]);

  useEffect(() => {
    if (address && !authenticated && !connectModalOpen) {
      login();
    }
  }, [address, connectModalOpen]);

  return (
    <Web3Context.Provider
      value={{
        error,
        address,
        handleConnect,
        signMessage,
        login,
        logout,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3Props => {
  const value = useContext(Web3Context);
  if (!value) throw new Error("Must be used within a AppProvider");
  return value;
};
