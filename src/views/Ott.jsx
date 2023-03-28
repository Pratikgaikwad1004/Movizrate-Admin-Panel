import { Button, message, Select } from "antd";
import React, { useState } from "react";

const Ott = ({ setKey, reloadActor }) => {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [ottPlatform, setOttPlatform] = useState("");
  const onChangeMovie = (value) => {
    console.log("Movie: ", value);
    setMovie(value);
  };

  const onChange = (value) => {
    setOttPlatform(value);
  };

  const onSearchMovie = (value) => {
    try {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        `http://127.0.0.1:3000/api/v1/movies/searchmovie/${value}`,
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

  const onSubmit = async () => {
    try {
      if (movie.length === 0) {
        return message.error("Select Movie");
      }
      if (ottPlatform.length === 0) {
        return message.error("Select OTT");
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        movieID: movie,
        ottname: ottPlatform,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://127.0.0.1:3000/api/v1/movies/addott", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status) {
            message.success("Movie added");
            setKey(reloadActor + 1);
          }
          if (result.error) {
            message.error(result.error);
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
              className="upload-items"
              placeholder="Select Type"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "netflix",
                  label: "Netflix",
                },
                {
                  value: "primevideo",
                  label: "Prime Video",
                },
                {
                  value: "hotstar",
                  label: "Disney+ Hotstar",
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

export default Ott;
