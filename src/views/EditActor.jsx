import { UploadOutlined } from "@ant-design/icons";
import { TextField } from "@mui/material";
import { Button, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config.json";

const EditActor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const props = {
    name: "file",
    accept: "image/png, image/jpeg, image/jpg",
    listType: "picture",
    action: `${config.server.host}/api/v1/movies/uploadimage`,
    multiple: false,
    async onChange(info) {
      if (info.file.status !== "uploading") {
        setImageURL(info.file.response.filePath);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(info) {
      try {
        const requestOptions = {
          method: "DELETE",
          redirect: "follow",
        };

        fetch(
          `${config.server.host}/api/v1/movies/deleteimage/${info.response.fileName}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.deleted) {
              message.success("File Deleted.");
            }
          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log(error);
      }
    },
  };

  const handleChange = (value) => {
    setType(value);
  };
  //   console.log(typeof type);
  useEffect(() => {
    if (!localStorage.getItem("@token")) {
      navigate("/login");
    }
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `https://api.movizrate.cloud/api/v1/movies/getactor/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setImageURL(result.actor.image);
        setName(result.actor.name);
        setType(result.actor.type);
      })
      .catch((error) => console.log("error", error));
    // eslint-disable-next-line
  }, []);

  const onSubmit = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: name,
        image: imageURL,
        type: type,
        id: id,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://api.movizrate.cloud/api/v1/movies/editactor",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === true) {
            message.success("Movie Updated");
            navigate("/");
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="container"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            backgroundColor: "whitesmoke",
            padding: 30,
            borderRadius: 20,
          }}
        >
          <Upload {...props}>
            <Button className="upload-img" icon={<UploadOutlined />}>
              Click to Upload Image
            </Button>
          </Upload>
          <TextField
            style={{ marginTop: 20 }}
            id="standard-basic"
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            placeholder={type}
            style={{
              marginTop: 20,
            }}
            onChange={handleChange}
            options={[
              {
                value: "Actor",
                label: "Actor",
              },
              {
                value: "Writer",
                label: "Dirctors and Writers",
              },
            ]}
          />
          <Button style={{ marginTop: 20 }} type="primary" onClick={onSubmit}>
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditActor;
