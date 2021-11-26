import { Menu } from "antd";
import { Link } from "react-router-dom";

export const RegisterDropdown = (
  <Menu>
    <Menu.Item className="dropdown">
      <Link to="/sign-up">Sign-Up</Link>
    </Menu.Item>
  </Menu>
);
