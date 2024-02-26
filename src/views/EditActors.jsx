import { Select } from "antd";
import React, { useState } from "react";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

const EditActors = () => {
    const [actors, setActors] = useState([]);

  const navigate = useNavigate();

  const onChangeActor = (value) => {
    navigate(`/actor/${value}`);
  };

  const onSearchActor = (value) => {
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
            console.log(result)
          setActors([]);
          setActors(result.actors);
          //   console.log(movies);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="upload-movie-container">
        <div className="upload-movie-main">
          <h3>Search Actor</h3>
          <div className="upload-movie-item">
            <Select
              showSearch
              className="upload-items"
              placeholder="Select Actor"
              optionFilterProp="children"
              onChange={onChangeActor}
              onSearch={onSearchActor}
              fieldNames={{ label: "name", value: "_id", options: "options" }}
              filterOption={(input, option) =>
                (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={actors}
            />
          </div>
        </div>
      </div>
  )
}

export default EditActors