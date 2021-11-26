/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleCircleFilled,
  FacebookFilled,
  SkypeFilled,
} from "@ant-design/icons";
import imgReg from "../../Assets/Login/register_2.svg";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import firebase, { auth, db } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";
import Axios from "axios";
import { useEffect } from "react";

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const history = useHistory();

  const handleLogin = async (fbProvider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.displayName,
        providerId: additionalUserInfo.providerId,
      });
    }
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState([]);

  const handleRole = () => {
    Axios.post("http://localhost:1337/login", {
      username: username,
      password: password,
      role: role,
    }).then((response) => {
      if (response.data.result) {
        setRole(response.data.result);
      }
    });
  };
  useEffect(() => {
    requestLogin();
  }, [role]);
  const requestLogin = () => {
    if (!role) {
      alert("wrong username or password!!");
    }
    if (
      role.map((val) => {
        return val.role;
      }) == "student"
    ) {
      history.push("/student-workspace");
    } else if (
      role.map((val) => {
        return val.role;
      }) == "teacher"
    ) {
      history.push("/teacher-workspace");
    }
  };

  return (
    <div className="login">
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
            <h1>Sign In</h1>
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
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="login__form--cbk">Remember me</Checkbox>
              </Form.Item>

              <a href="#" className="login__form--forgot">
                Forgot password ?
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="login__form--btn"
                onClick={handleRole}
              >
                Sign in
              </Button>

              <Form.Item>
                <GoogleCircleFilled
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginLeft: "39%",
                    marginTop: "2%",
                  }}
                  onClick={() => handleLogin(googleProvider)}
                  className="login__form--socialbtn"
                />
                <FacebookFilled
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginLeft: "3%",
                  }}
                  onClick={() => handleLogin(fbProvider)}
                  className="login__form--socialbtn"
                />
                <SkypeFilled
                  style={{
                    fontSize: "33px",
                    cursor: "pointer",
                    marginLeft: "3%",
                  }}
                  className="login__form--socialbtn"
                />
              </Form.Item>
              <span className="login__form--signup">
                Or <Link to="/sign-up">register now!</Link>
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
