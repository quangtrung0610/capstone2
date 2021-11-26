import { UnorderedListOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { RegisterDropdown } from "./MenuDropdown";
import { Avatar, Badge, Dropdown } from "antd";

const Navigation = () => {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="header__navigation">
      <div className="tableHidden">
        <ul className="header__navigation--WrapItem">
          <li>
            <Link Link to="/home">
              Home
            </Link>
          </li>

          <li>
            <Link Link to="/about-us">
              About Us
            </Link>
          </li>

          <li>
            <Dropdown overlay={RegisterDropdown} placement="bottomCenter" arrow>
              <Link Link to="/sign-in">
                Sign In
              </Link>
            </Dropdown>
          </li>
        </ul>
      </div>
      <div className="tableVisible">
        <UnorderedListOutlined
          style={{ fontSize: "30px", color: "#fff" }}
          onClick={showDrawer}
        />
        <Drawer
          title="Menu"
          placement="left"
          onClose={onClose}
          visible={visible}
        >
          <li>
            <Link Link to="/home">
              Home
            </Link>
          </li>

          <li>
            <Link Link to="/about-us">
              About Us
            </Link>
          </li>

          <li>
            <Dropdown overlay={RegisterDropdown} placement="bottomCenter" arrow>
              <Link to="/sign-in">Sign In</Link>
            </Dropdown>
          </li>
        </Drawer>
      </div>
    </div>
  );
};

export default Navigation;
