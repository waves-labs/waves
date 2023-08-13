import { useWeb3 } from "../../hooks/useWeb3";

import { Button } from "../Button";

interface ProfileActionsProps {}

export const ProfileActions: React.FC<ProfileActionsProps> = () => {
  const { address, handleConnect, logout } = useWeb3();

  return (
    <div className="flex flex-col gap-3 items-center w-full">
      <Button
        title={address ? "Disconnect" : "Connect"}
        onClick={address ? logout : handleConnect}
      />
      {/* {<p className="text-red-500 line-clamp-2">{error}</p>} */}
    </div>
  );
};
