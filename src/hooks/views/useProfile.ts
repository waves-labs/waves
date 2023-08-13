import { SpringValue, useSpring } from "@react-spring/web";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

type Status =
  | "disconnected"
  | "connected"
  | "reconnecting"
  | "connecting"
  | "error"
  | "idle"
  | "loading"
  | "success";

export interface ProfileDataProps {
  address?: string;
  accountStatus?: Status;
  name?: string | null;
  nameStatus?: Status;
  avatar?: string | null;
  avatarStatus?: Status;
  avatarSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}

export const useProfile = (): ProfileDataProps => {
  const { address, status: accountStatus } = useAccount();
  const { data: name, status: nameStatus } = useEnsName();
  const { data: avatar, status: avatarStatus } = useEnsAvatar();

  const avatarSpring = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
  });

  return {
    address,
    accountStatus,
    name,
    nameStatus,
    avatar,
    avatarStatus,
    avatarSpring,
  };
};
