import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, getError } from "../util";
import { toast } from 'react-toastify';

const Recipe = ({
  title,
  ingredients,
  instruction,
  image,
  userName,
  isUser,
  id,
  flag,
}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myRecipes/${id}`);
  };

  // const res = await axios.delete(`${BACKEND_URL}/recipes/${id}`).catch(err=>console.log(err));
  // const data = await res.data;
  // return data;
  const [isChange, setisChange] = useState(false);


  const deleteRequest = async () => {
    await fetch(`${BACKEND_URL}/recipes/${id}`, {
      method: "delete",
    });
  };

  const handleDelete = () => {
    setisChange(true);
    deleteRequest().then(() => navigate("/myRecipes"));
  };
  const data = {
    id: id,
    userId: localStorage.getItem("userId"),
  };
  const handleaddFav = async () => {
    // console.log(`THis is my id ${id}`);
    // console.log(`THis is my id ${localStorage.getItem("userId")}`);
    try{
    fetch(`${BACKEND_URL}/recipes/like`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res)=>res.json()).then((data)=>{
      if(data.message==="Already Liked"){
        toast.error(data.message)
      }
      else{
        toast.success("Liked")
      }
    })
  }catch(err){
    toast.error(getError(err).message)
  }
    // navigate('/fav')
  };

  // useEffect(()=>{
  //   deleteRequest().then(() => navigate("/recipes"));
  // },[isChange])

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
        {flag && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        {!flag && (
          <Box display="flex">
            <IconButton onClick={handleaddFav} sx={{ marginLeft: "auto" }}>
              <StarBorderIcon color="warning" />
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
