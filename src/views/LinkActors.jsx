import React, { useState } from "react";
import { Button, message } from "antd";
import "../css/UploadMovie.css";
import { Select } from "antd";
import config from "../config.json";

const LinkActor = ({ setKey, reloadComp }) => {
  const [actor, setActor] = useState("");
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");

  const onChange = (value) => {
    console.log("Actor: ", value);
    setActor(value);
  };
  const onSearch = (value) => {
    try {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        `${config.server.host}/api/v1/movies/searchactor/${value}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setActors([]);
          setActors(result.actors);
          console.log(actors);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeMovie = (value) => {
    console.log("Movie: ", value);
    setMovie(value);
  };

  const onSearchMovie = (value) => {
    try {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        `${config.server.host}/api/v1/movies/searchmovie/${value}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setMovies([]);
          setMovies(result.movies);
          console.log(movies);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        movieID: movie,
        actorID: actor,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${config.server.host}/api/v1/movies/addmovieactor`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            return message.error(result.error);
          }
          if (result.msg) {
            setKey(reloadComp + 1);
            return message.success("Success");
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
          <div className="upload-movie-item">
            <Select
              showSearch
              className="upload-items"
              placeholder="Select Movie"
              optionFilterProp="children"
              onChange={onChangeMovie}
              onSearch={onSearchMovie}
              fieldNames={{ label: "name", value: "_id", options: "options" }}
              filterOption={(input, option) =>
                (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={movies}
            />
          </div>
          <div className="upload-movie-item">
            <Select
              showSearch
              className="upload-items"
              placeholder="Select Actor"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              fieldNames={{ label: "name", value: "_id", options: "options" }}
              filterOption={(input, option) =>
                (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={actors}
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

export default LinkActor;
