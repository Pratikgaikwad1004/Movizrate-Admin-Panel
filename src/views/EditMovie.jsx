import { UploadOutlined } from "@ant-design/icons";
import { TextField, TextareaAutosize } from "@mui/material";
import { Button, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config.json";

const EditMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageURL, setImageURL] = useState("");
  const [posterImageUrl, setPosterImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [type, setType] = useState("");
  const [videoID, setVideoID] = useState("");
  const [upcomming, setUpcomming] = useState(false);

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
  const props2 = {
    name: "file",
    accept: "image/png, image/jpeg, image/jpg",
    listType: "picture",
    action: `${config.server.host}/api/v1/movies/uploadimage`,
    multiple: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        setPosterImageUrl(info.file.response.filePath);
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
  const onChangeUpcomming = (value) => {
    setUpcomming(value);
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
      `https://api.movizrate.cloud/api/v1/movies/getmovie/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setImageURL(result.movie.image);
        setPosterImageUrl(result.movie.posterImage);
        setGenre(result.movie.genre);
        setDescription(result.movie.desc);
        setMovieName(result.movie.name);
        setType(result.movie.type);
        setVideoID(result.movie.videoID);
        setUpcomming(result.movie.upcoming);
      })
      .catch((error) => console.log("error", error));
    // eslint-disable-next-line
  }, []);

  const onSubmit = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: movieName,
        image: imageURL,
        posterImage: posterImageUrl,
        genre: genre,
        desc: description,
        type: type,
        videoID: videoID,
        upcomming: upcomming,
        id: id,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://api.movizrate.cloud/api/v1/movies/editmovie",
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
              Click to Upload Poster Image
            </Button>
          </Upload>
          <Upload {...props2}>
            <Button className="upload-img" icon={<UploadOutlined />}>
              Click to Upload Image
            </Button>
          </Upload>
          <TextField
            style={{ marginTop: 20 }}
            id="standard-basic"
            label="Genre"
            variant="standard"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <TextareaAutosize
            style={{ marginTop: 20 }}
            color="neutral"
            disabled={false}
            minRows={10}
            value={description}
            placeholder="Description"
            size="lg"
            variant="plain"
          />
          <TextField
            style={{ marginTop: 20 }}
            id="standard-basic"
            label="Name"
            variant="standard"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
          />
          <Select
            placeholder={type}
            style={{
              marginTop: 20,
            }}
            onChange={handleChange}
            options={[
              {
                value: "movie",
                label: "Movie",
              },
              {
                value: "tvseries",
                label: "TV-Series",
              },
            ]}
          />
          <TextField
            style={{ marginTop: 20 }}
            id="standard-basic"
            label="VideoID"
            variant="standard"
            value={videoID}
            onChange={(e) => setVideoID(e.target.value)}
          />
          <Select
            style={{ marginTop: 20 }}
            placeholder="Select Upcomming"
            defaultValue={false}
            onChange={onChangeUpcomming}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: true,
                label: "Yes",
              },
              {
                value: false,
                label: "No",
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

export default EditMovie;
