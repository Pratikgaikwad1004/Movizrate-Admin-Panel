import { Select } from "antd";
import React, { useState } from "react";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

const EditMovies = ({ setKey, reloadcomp }) => {
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  const onChangeMovie = (value) => {
    navigate(`/movie/${value}`);
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
          //   console.log(movies);
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
          <h3>Search Movie</h3>
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
        </div>
      </div>
    </>
  );
};

export default EditMovies;
