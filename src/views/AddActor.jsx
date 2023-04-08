import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Input } from "antd";
import "../css/UploadMovie.css";
import { Select } from "antd";
import config from "../config.json";

const AddActor = ({ setKey, reloadActor }) => {
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [actorType, setActorType] = useState("");

  const onChange = (value) => {
    setActorType(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

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

  const onSubmit = () => {
    if (imageURL.length === 0) {
      return message.error("Please select a image.");
    }
    if (name.length === 0) {
      return message.error("Please enter a name.");
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: name,
      image: imageURL,
      type: actorType,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${config.server.host}/api/v1/movies/addactor`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.uploaded) {
          message.success("Actor is uploaded");
          setKey(reloadActor + 1);
          setImageURL("");
          setName("");
        } else {
          message.error("Failure!");
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className="upload-movie-container">
        <div className="upload-movie-main">
          <div className="upload-movie-item">
            <Upload {...props}>
              <Button className="upload-items" icon={<UploadOutlined />}>
                Click to Upload Image
              </Button>
            </Upload>
          </div>
          <div className="upload-movie-item">
            <Input
              className="upload-items"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter actor name"
            />
          </div>
          <div className="upload-movie-item">
            <Select
              showSearch
              className="upload-items"
              placeholder="Select Type"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
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

export default AddActor;
