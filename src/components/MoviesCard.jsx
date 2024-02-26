import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import config from "../config.json";

export default function MoviesCard(props) {
  const navigate = useNavigate();
  const onEdit = (id) => {
    navigate(`/movie/${id}`);
  };
  const onDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${config.server.host}/api/v1/movies/deletemovie/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result === true) {
          message.success("Movie deleted please refresh page");
        }
        //   console.log(movies);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        minWidth: 350,
        maxWidth: 350,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="p"
            fontSize={20}
            textAlign={"justify"}
          >
            {props.moviename}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="Edit" onClick={() => onEdit(props.id)}>
            <EditIcon sx={{ height: 30, width: 30 }} />
          </IconButton>
          <IconButton aria-label="Delete" onClick={() => onDelete(props.id)}>
            <DeleteIcon sx={{ height: 30, width: 30 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`${props.image}`}
        alt="Live from space album cover"
      />
    </Card>
  );
}
