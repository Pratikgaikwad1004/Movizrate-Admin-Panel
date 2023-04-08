import { Button, Select, message } from "antd";
import React, { useState } from "react";
import config from "../config.json";

const AddAdmin = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const onChangeUser = (value) => {
    setUser(value);
  };

  const onSearchUser = (value) => {
    try {
      if (value.length === 0) {
        return;
      }
      const token = localStorage.getItem("@token");
      var myHeaders = new Headers();
      myHeaders.append("authtoken", token);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `${config.server.host}/api/v1/auth/getusers/${value}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setUsers(result.users))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    try {
      const token = localStorage.getItem("@token");
      const myHeaders = new Headers();
      myHeaders.append("authtoken", token);

      if (user.length === 0) {
        return message.error("Select user");
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `${config.server.host}/api/v1/auth/createadmin/${user}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg) {
            message.success(result.msg);
          }
          if (result.error) {
            message.success(result.error);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="upload-movie-container">
        <div className="upload-movie-main">
          <h3>Add in Carousel</h3>
          <div className="upload-movie-item">
            <Select
              showSearch
              className="upload-items"
              placeholder="Select Movie"
              optionFilterProp="children"
              onChange={onChangeUser}
              onSearch={onSearchUser}
              fieldNames={{
                label: "email",
                value: "email",
                options: "options",
              }}
              filterOption={(input, option) =>
                (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={users}
            />
          </div>
          <div className="upload-movie-item">
            <Button className="upload-items" onClick={onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
