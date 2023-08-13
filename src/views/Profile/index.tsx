import React from "react";

import { ProfileDataProps } from "../../hooks/views/useProfile";

import { ProfileInfo } from "../../components/Profile/Info";
import { ProfileActions } from "../../components/Profile/Actions";

interface ProfileProps extends ProfileDataProps {}

export const Profile: React.FC<ProfileProps> = ({
  avatarSpring,
  address,
  name,
}) => {
  return (
    <section className={`flex flex-col w-full items-center gap-3 pt-24 px-4`}>
      <ProfileInfo
        avatar={"/assets/avatar.png"}
        username={name || address}
        avatarSpring={avatarSpring}
      />
      <ProfileActions />
    </section>
  );
};

export default Profile;
