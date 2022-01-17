import React, { useState } from "react";
import "./Login.css";
import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import md5 from "js-md5";
function Login(props) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let loginParams = {
    username: "admin",
    password: md5("123456"),
  };
  let handlePressEnt = async () => {
    // let { data } = await signIn({ username, password: md5(password) });
    // if (data.code === 200) {
    if (
      username === loginParams.username &&
      md5(password) === loginParams.password
    ) {
    }
    localStorage.setItem("Auth-Token", true);
    props.history.push("/");
    // }
  };
  let handleInputUser = (e) => {
    setUsername(e.target.value);
  };
  let handleInputPwd = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="container">
      <div className="login_box">
        <Space direction="vertical">
          <h3 className="login_title">web网管系统</h3>
          <Input placeholder="请输入用户名" onChange={handleInputUser} />
          <Input.Password
            placeholder="请输入密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onPressEnter={handlePressEnt}
            onChange={handleInputPwd}
          />
        </Space>
      </div>
    </div>
  );
}

export default React.memo(Login);
