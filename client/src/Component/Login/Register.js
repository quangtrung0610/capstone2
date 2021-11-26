import { Link } from "react-router-dom";
import imgReg from "../../Assets/Login/register_1.svg";
import React from "react";
import Axios from "axios";
import { Form, Input, Button } from "antd";
import UserOutlined from "@ant-design/icons";

const Login = () => {
  const [usernameReg, setUsernameReg] = React.useState("");
  const [firstNameReg, setFristNameReg] = React.useState("");
  const [lastNameReg, setLastNameReg] = React.useState("");
  const [emailReg, setEmailReg] = React.useState("");
  const [passwordReg, setPasswordReg] = React.useState("");

  const register = () => {
    Axios.post("http://localhost:1337/register", {
      username: usernameReg,
      first_name: firstNameReg,
      last_name: lastNameReg,
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="register">
      <div className="container">
        <div className="register__form">
          <Form
            layout={"vertical"}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <h1>Sign Up</h1>

            <Form.Item
              label="Username:"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                className="register__form--ipn"
                placeholder="Enter your username..."
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              label="Full name:"
              name="Full name"
              rules={[
                {
                  required: true,
                  message: "Please input your Full name!",
                },
              ]}
            >
              <Input.Group>
                <Input
                  style={{ width: "50%" }}
                  className="register__form--ipn"
                  placeholder="Enter your First name..."
                  onChange={(e) => {
                    setFristNameReg(e.target.value);
                  }}
                />
                <Input
                  style={{ width: "50%" }}
                  className="register__form--ipn"
                  placeholder="Enter your Last name..."
                  onChange={(e) => {
                    setLastNameReg(e.target.value);
                  }}
                />
              </Input.Group>
            </Form.Item>

            <Form.Item
              label="Email address:"
              name="Email address"
              rules={[
                {
                  required: true,
                  message: "Please input your Email address!",
                },
              ]}
            >
              <Input
                className="register__form--ipn"
                placeholder="Enter your Email address..."
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              label="Password:"
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                type="password"
                className="register__form--ipn"
                placeholder="Enter your Password..."
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
            </Form.Item>

            <Button
              className="register__form--btn"
              type="danger"
              onClick={register}
            >
              Sign Up
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
        <div className="register__img">
          <Link to="/home">
            <img src={imgReg} alt="register" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
