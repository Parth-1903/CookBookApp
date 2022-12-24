import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../util";

const Recipe = ({
  title,
  ingredients,
  instruction,
  image,
  userName,
  isUser,
  id,
}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myRecipes/${id}`);
  };

  // const res = await axios.delete(`${BACKEND_URL}/recipes/${id}`).catch(err=>console.log(err));
  // const data = await res.data;
  // return data;
  const deleteRequest = async () => {
    await fetch(`${BACKEND_URL}/recipes/${id}`, {
      method: "delete",
    });
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/recipes"));
  };
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
          //   subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>Posted By: </b>
            {userName}
            <br />
            <br />
            <b>Ingredients: </b>
            {ingredients}
            <br />
            <br />
            <hr />
            <br />
            <b>Instruction: </b>
            <br />
            {instruction}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recipe;
