import React from "react";
import { a } from "@react-spring/web";

import { useApp } from "../../hooks/useApp";
import { ProfileDataProps } from "../../hooks/views/useProfile";

import { ProfileInfo } from "../../components/Profile/Info";
import { ProfileActions } from "../../components/Profile/Actions";

interface ProfileProps extends ProfileDataProps {}

export const Profile: React.FC<ProfileProps> = ({
  tabsSpring,
  avatarSpring,
}) => {
  const { isDesktop } = useApp();

  return (
    <section
      className={`overflow-hidden ${
        isDesktop ? "bg-inherit" : "bg-primary"
      } profile-view flex-col justify-center`}
    >
      <ProfileInfo avatar={""} avatarSpring={avatarSpring} />
      <a.div
        style={tabsSpring}
        className="profile-tabs relative flex flex-col rounded-t-3xl w-full px-6 bg-base-100 shadow-xl"
      >
        <ProfileActions />
      </a.div>
    </section>
  );
};

export default Profile;
