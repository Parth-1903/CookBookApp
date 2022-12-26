import {
  Button,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { BACKEND_URL } from "../util";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState([]);
  const [inputs, setinputs] = useState({
    title: "",
    ingredients: "",
    instruction: "",
    image: "",
    user: localStorage.getItem("userId"),
  });
  const searchHandler = async () => {
    const { data } = await axios.get(
      `https://forkify-api.herokuapp.com/api/search?q=${inputs.title}`
    );
    console.log(data.recipes);
    setSearch(data.recipes);
  };

  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (data) => {
    try {
      const res = await fetch(`${BACKEND_URL}/recipes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
        body: JSON.stringify(data),
      });
      // const res = await axios.post(`${BACKEND_URL}/recipes/add`, {
      //   title: inputs.title,
      //   ingredients: inputs.ingredients,
      //   instruction: inputs.instruction,
      //   image: inputs.image,
      //   user: localStorage.getItem("userId"),
      // });
      // const data = await res.data;
      // return data;
    } catch (err) {
      console.log(err);
    }
  };

  const saveHandler = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.get(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );
      console.log(data);
      const arr = data.recipe.ingredients.join(" ");
      setinputs((prev) => ({
        ...prev,
        title: data.recipe.title,
        ingredients: arr,
        image: data.recipe.image_url,
      }));
    } catch (err) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !inputs.title ||
      !inputs.instruction ||
      !inputs.ingredients ||
      !inputs.image
    ) {
      toast.error("Please fill all the inputs")
      return
    }
    sendRequest(inputs)
      .then((data) => console.log(data))
      .then(() => navigate("/recipes"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Recipe
          </Typography>

          <InputLabel>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" color="warning" onClick={searchHandler}>
            SUGGESTION
          </Button>
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              {search.map((s) => {
                return (
                  <a
                    key={s.recipe_id}
                    onClick={() => {
                      saveHandler(s.recipe_id);
                    }}
                  >
                    {s.title}
                  </a>
                );
              })}
            </div>
          </div>

          <InputLabel>Ingredients</InputLabel>
          <TextareaAutosize
            name="ingredients"
            onChange={handleChange}
            value={inputs.ingredients}
            margin="normal"
            variant="outlined"
          />

          <InputLabel>Instruction</InputLabel>
          <TextareaAutosize
            name="instruction"
            onChange={handleChange}
            value={inputs.instruction}
            margin="normal"
            variant="outlined"
          />

          <InputLabel>Image</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddRecipe;
