import { Menu, Dropdown, Input, Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Search } = Input;
const NavBar = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/profile", { withCredentials: true }).then(
      (res) => {
        console.log(res.data.result[0].birtday);
        if (res.data.result) {
          setProfile(res.data.result[0]);
        }
      }
    );
  }, []);

  const signOut = () => {
    Axios.get("http://localhost:1337/logout", { withCredentials: true });
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={signOut}>
        <Link to="/home">Sign-out</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header
        className="site-layout-background"
        style={{ padding: 0, borderRadius: "0px 0px 30px 30px" }}
      >
        {/* <Search
          className="search-bar"
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          //   onSearch={onSearch}
        /> */}
        <div className="user-management">
          <Dropdown overlay={menu} placement="bottomCenter">
            <span style={{ border: "none" }}>
              hello,
              <Link to="/student-workspace/profile">
                {profile.first_name} {profile.last_name}{" "}
                <Avatar className="avatar" icon={<UserOutlined />} />
              </Link>
            </span>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default NavBar;
