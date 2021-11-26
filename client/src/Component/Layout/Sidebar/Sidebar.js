import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@trendmicro/react-breadcrumbs";
import {
  FaBook,
  FaBriefcase,
  FaBullhorn,
  FaCalendarAlt,
  FaCheckSquare,
  FaCogs,
  FaComments,
  FaHouseUser,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div>
      <SideNav
        onSelect={(selected) => {
          // Add your code here
        }}
        className="sidenav"
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="student-workspace">
          <NavItem eventKey="student-workspace">
            <NavIcon>
              <FaHouseUser className="sidenav__icon" />
            </NavIcon>
            <NavText Link to="/">
              Home
            </NavText>
          </NavItem>
          <NavItem eventKey="student-workspace/profile">
            <NavIcon>
              <FaUser className="sidenav__icon" />
            </NavIcon>
            <NavText>Profile</NavText>
          </NavItem>
          {/* <NavItem eventKey="announcements">
            <NavIcon>
              <FaBullhorn style={{ fontSize: "1.80em", marginTop: "10px" }} />
            </NavIcon>
            <NavText>Announcements</NavText>
          </NavItem> */}

          <NavItem eventKey="student-workspace/schedule">
            <NavIcon>
              <FaCalendarAlt className="sidenav__icon" />
            </NavIcon>
            <NavText>Schedule</NavText>
          </NavItem>
          <NavItem eventKey="student-workspace/assignment">
            <NavIcon>
              <FaBriefcase className="sidenav__icon" />
            </NavIcon>
            <NavText>Assignment</NavText>
          </NavItem>
          <NavItem eventKey="student-workspace/quizz">
            <NavIcon>
              <FaCheckSquare className="sidenav__icon" />
            </NavIcon>
            <NavText>Test and Quizzes</NavText>
          </NavItem>
          <NavItem eventKey="student-workspace/chatroom">
            <NavIcon>
              <FaComments style={{ fontSize: "2em", marginTop: "10px" }} />
            </NavIcon>
            <NavText>Chatroom</NavText>
          </NavItem>
          <NavItem eventKey="student-workspace/teamwork">
            <NavIcon>
              <FaUsers className="sidenav__icon" />
            </NavIcon>
            <NavText>Team Work</NavText>
          </NavItem>

          <NavItem eventKey="student-workspace/signout">
            <NavIcon>
              <FaSignOutAlt style={{ fontSize: "2em", marginTop: "10px" }} />
            </NavIcon>
            <NavText>Sign Out</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default Sidebar;
