import React from "react";
import Profile from "../Component/profile/Profile";

const ProfilePage = () => {
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: "100%", borderRadius: "30px" }}
    >
      <Profile />
    </div>
  );
};

export default ProfilePage;
