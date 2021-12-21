import React from "react";

import ScheduleTeacher from "../Component/schedule/teacherSchedule";

const ScheduleTeacherPage = () => {
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: "100%", borderRadius: "30px" }}
    >
      <ScheduleTeacher />
    </div>
  );
};

export default ScheduleTeacherPage;
