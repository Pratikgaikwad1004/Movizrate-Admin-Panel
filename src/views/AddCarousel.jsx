import { Button, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import config from "../config.json";

const AddCarousel = ({ setKey, reloadActor }) => {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [carouselMovie, setCarouselMovie] = useState([]);

  const onChangeMovie = (value) => {
    setMovie(value);
  };

  const onChangeCarouselMovie = (value) => {
    setCarouselMovie(value);
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

  useEffect(() => {
    try {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        `${config.server.host}/api/v1/movies/getcarouselmovies`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setCarouselMovies([]);
          setCarouselMovies(result.movies);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = async () => {
    try {
      const requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        `${config.server.host}/api/v1/movies/addincarousel/${movie}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result === true) {
            message.success("Movie successfully added");
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

  const onDelete = () => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      fetch(
        `${config.server.host}/api/v1/movies/deletecarouselmovie/${carouselMovie}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result === true) {
            message.success("Movie successfully deleted");
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
          <h3>Add in Carousel</h3>
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
            <Button className="upload-items" onClick={onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </div>
        <div className="upload-movie-main" style={{ marginTop: 100 }}>
          <h3>Delete from Carousel</h3>
          <div className="upload-movie-item">
            <Select
              className="upload-items"
              placeholder="Select Movie"
              optionFilterProp="children"
              onChange={onChangeCarouselMovie}
              fieldNames={{ label: "name", value: "_id", options: "options" }}
              filterOption={(input, option) =>
                (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={carouselMovies}
            />
          </div>
          <div className="upload-movie-item">
            <Button className="upload-items" onClick={onDelete} type="primary">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCarousel;
