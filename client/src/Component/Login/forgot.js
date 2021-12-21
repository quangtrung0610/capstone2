import { Link } from "react-router-dom";
import imgReg from "../../Assets/Login/register_1.svg";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, Typography } from "antd";
const { Text } = Typography;
const { Option } = Select;

const Forgot = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = React.useState("");
  const [handleMessage, sethandleMessage] = useState("");

  const handleSubmit = () => {
    const data = {
      username: username,
      password: password,
    };
    //console.log(classes);
    Axios.put("http://localhost:1337/forgot-password", data, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          sethandleMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="container">
        <div className="login__img">
          <Link to="/home">
            <img src={imgReg} alt="register" />
          </Link>
        </div>
        <div className="login__form">
          <Form
            layout={"vertical"}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <h1>Forgot password</h1>

            <Form.Item
              label="Username"
              className="login__form--ipn"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                className="ipn"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              className="login__form--ipn"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                className="ipn"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Text type="danger">{handleMessage}</Text>
            </Form.Item>

            <Button
              type="primary"
              className="login__form--btn"
              onClick={handleSubmit}
            >
              Forgot password
            </Button>
            <span
              style={{
                position: "relative",
                float: "right",
              }}
            >
              Already registered <Link to="/sign-in">sign in?</Link>
            </span>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
