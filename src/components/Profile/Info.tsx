import { SpringValue, a } from "@react-spring/web";

import { useApp } from "../../hooks/useApp";

// TODO: Polish styles to match designs

interface ProfileInfoProps {
  username?: string;
  avatar?: string;
  avatarSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  avatar,
  avatarSpring,
}) => {
  const { theme } = useApp();

  function generateUsername() {
    if (!(theme === "light" || theme === "dark")) {
      return `Team ${theme}`;
    }

    return "Username";
  }
  return (
    <a.div
      className="profile-avatar flex items-center w-full px-3 sm:px-6 h-full"
      style={avatarSpring}
    >
      <div className="bg-base-100 shadow-xl flex gap-3 rounded-2xl w-full px-3">
        <div className="avatar">
          <div className=" text-neutral-content rounded-full w-20">
            <img src={avatar} alt="profile avatar" />
          </div>
        </div>
        <div className={`flex flex-col flex-1 gap-1`}>
          <div
            className={`flex text-primary items-center gap-2 justify-between w-full h-full`}
          >
            <h3 className="text-xl font-bold capitalize">
              {generateUsername()}
            </h3>
          </div>
        </div>
      </div>
    </a.div>
  );
};
