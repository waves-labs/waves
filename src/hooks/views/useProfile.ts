import { useState } from "react";
import { FetchBalanceResult } from "wagmi/dist/actions";
import { SpringValue, config, useSpring } from "@react-spring/web";
import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";

type Status =
  | "disconnected"
  | "connected"
  | "reconnecting"
  | "connecting"
  | "error"
  | "idle"
  | "loading"
  | "success";

export type ProfileTab = "info" | "settings";

export interface ProfileDataProps {
  balance?: FetchBalanceResult;
  address?: string;
  accountStatus?: Status;
  name?: string | null;
  nameStatus?: Status;
  avatar?: string | null;
  avatarStatus?: Status;
  tab: ProfileTab;
  tabsSpring: {
    transform: SpringValue<string>;
  };
  changeTab: (tab: ProfileTab) => void;
  avatarSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}

export const useProfile = (): ProfileDataProps => {
  const [tab, setTab] = useState<ProfileTab>("info");

  const { data: balance } = useBalance();
  const { address, status: accountStatus } = useAccount();
  const { data: name, status: nameStatus } = useEnsName();
  const { data: avatar, status: avatarStatus } = useEnsAvatar();

  const avatarSpring = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
  });

  const tabsSpring = useSpring({
    from: { transform: "translate3d(0, 100%, 0)" },
    to: { transform: "translate3d(0, 0%, 0)" },
    config: {
      ...config.slow,
    },
  });

  function changeTab(tab: ProfileTab) {
    setTab(tab);
  }

  return {
    balance,
    address,
    accountStatus,
    name,
    nameStatus,
    avatar,
    avatarStatus,
    tab,
    tabsSpring,
    changeTab,
    avatarSpring,
  };
};
