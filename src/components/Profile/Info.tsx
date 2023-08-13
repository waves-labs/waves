import { SpringValue, a } from "@react-spring/web";

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
  username,
}) => {
  return (
    <a.div
      className="profile-avatar flex flex-col gap-3 h-32 items-center w-full px-3 sm:px-6"
      style={avatarSpring}
    >
      <div className="text-neutral-content rounded-full w-20">
        <img src={avatar} alt="profile avatar" className="" />
      </div>
      <h3 className="text-lg w-2/3 line-clamp-1 capitalize">{username}</h3>
    </a.div>
  );
};
