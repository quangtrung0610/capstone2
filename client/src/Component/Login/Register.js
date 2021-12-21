import { Link } from "react-router-dom";
import imgReg from "../../Assets/Login/register_1.svg";
import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Form, Input, Button, Select, Typography, Checkbox } from "antd";
const { Text } = Typography;
const { Option } = Select;

const Login = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [firstNameReg, setFristNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [classesReg, setClassesReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [genderReg, setgenderReg] = useState("");
  const [handleMessage, sethandleMessage] = useState("");
  const [getClasses, setGetClasses] = useState([]);
  const [getGender, setGetGender] = useState([]);

  const handleSubmit = () => {
    const data = {
      username: usernameReg,
      first_name: firstNameReg,
      last_name: lastNameReg,
      gender_id: genderReg,
      email: emailReg,
      class_id: classesReg,
      password: passwordReg,
      password_confirm: confirmPasswordReg,
    };
    //console.log(classes);
    Axios.post("http://localhost:1337/register", data)
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
  useEffect(() => {
    Axios.get("http://localhost:1337/api/get/class").then((res) => {
      console.log(res.data.result);
      if (res.data.result) {
        setGetClasses(res.data.result);
      }
    });
    Axios.get("http://localhost:1337/api/get/gender").then((res) => {
      console.log(res.data.result);
      if (res.data.result) {
        setGetGender(res.data.result);
      }
    });
  }, []);

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
              label="Classes:"
              name="Classes"
              rules={[
                {
                  required: true,
                  message: "Please input your Class!",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                onChange={(e) => {
                  setClassesReg(e);
                }}
              >
                {getClasses.map((e) => (
                  <Option key={e.class_id}>{e.class_name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Gender:"
              name="Gender"
              rules={[
                {
                  required: true,
                  message: "Please input your Class!",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                onChange={(e) => {
                  setgenderReg(e);
                }}
              >
                {getGender.map((e) => (
                  <Option key={e.gender_id}>{e.gender_name}</Option>
                ))}
              </Select>
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
            <Form.Item
              label="Confirm Password:"
              name="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm Password!",
                },
              ]}
            >
              <Input
                type="password"
                className="register__form--ipn"
                placeholder="Enter your Password..."
                onChange={(e) => {
                  setConfirmPasswordReg(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Text type="danger">{handleMessage}</Text>
            </Form.Item>
            <Button
              className="register__form--btn"
              type="danger"
              onClick={handleSubmit}
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
