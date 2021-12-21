import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Form, Input, Button, Select, Typography, DatePicker } from "antd";
import { Link } from "react-router-dom";
import imgReg from "../../Assets/Login/register_1.svg";
import moment from "moment";

const { Option } = Select;

const ProfileTeahcer = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/profile-teacher", {
      withCredentials: true,
    }).then((res) => {
      //console.log(moment(res.data.result[0].birtday));
      if (res.data.result) {
        setProfile(res.data.result[0]);
      }
    });
  }, []);

  const handleSubmit = () => {};
  return (
    <div className="profile">
      <div className="container">
        <div className="register__form">
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            size="large"
          >
            <h1>Profile </h1>

            <Form.Item label="Username:">
              <Input
                inputReadOnly
                value={profile.username}
                className="register__form--ipn"
                placeholder="Username..."
              />
            </Form.Item>

            <Form.Item label="Full name:">
              <Input.Group>
                <Input
                  inputReadOnly
                  value={profile.first_name}
                  style={{ width: "50%" }}
                  className="register__form--ipn"
                  placeholder="First name..."
                />
                <Input
                  inputReadOnly
                  value={profile.last_name}
                  style={{ width: "50%" }}
                  className="register__form--ipn"
                  placeholder="Last name..."
                />
              </Input.Group>
            </Form.Item>
            <Form.Item label="Gender:">
              <Input
                inputReadOnly
                value={profile.gender_name}
                className="register__form--ipn"
                placeholder="Classes..."
              />
            </Form.Item>
            <Form.Item label="Birtday:">
              <DatePicker
                style={{ width: "100%" }}
                value={moment(profile.birtday, "YYYY/MM/DD")}
              />
            </Form.Item>
            <Form.Item label="Subject teacher:">
              <Input
                inputReadOnly
                value={profile.subject_name}
                className="register__form--ipn"
                placeholder="Subject...."
              />
            </Form.Item>

            <Form.Item label="Email address:">
              <Input
                value={profile.email}
                className="register__form--ipn"
                placeholder="Email address..."
              />
            </Form.Item>
            <Form.Item label="Phone Number:">
              <Input
                value={profile.phone_number}
                className="register__form--ipn"
                placeholder="Phone Number..."
              />
            </Form.Item>
          </Form>
          <Button
            className="register__form--btn"
            type="danger"
            onClick={handleSubmit}
          >
            Update
          </Button>
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

export default ProfileTeahcer;
