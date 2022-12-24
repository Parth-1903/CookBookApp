import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../util";
// const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const RecipeDetail = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // const res = await axios
  //   .get(`${BACKEND_URL}/recipes/${id}`)
  //   .catch((err) => console.log(err));
  const fetchDetails = async () => {
    const res = await fetch(`${BACKEND_URL}/recipes/${id}`)
    const data = res.json();
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setRecipe(data.recipe);
      setInputs({
        title: data.recipes.title,
        ingredients: data.recipes.ingredients,
        instruction: data.recipes.instruction,
        image: data.recipes.image,
      });
    });
  }, [id]);
  // const res = await axios
  //   .put(`${BACKEND_URL}/recipes/update/${id}`, {
  //     title: inputs.title,
  //     ingredients: inputs.ingredients,
  //     instruction: inputs.instruction,
  //     image: inputs.image,
  //   })
  //   .catch((err) => console.log(err));
  const sendRequest = async (inputs) => {
    const res = await fetch(`${BACKEND_URL}/recipes/update/${id}`,{
      method:"put",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(inputs)
    })
    const data = res.json();
    return data;
  };
  console.log(recipe);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest(inputs)
      .then((data) => console.log(data))
      .then(() => navigate("/myRecipes/"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
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
              margin="auto"
              variant="outlined"
            />
            <InputLabel>Ingredients</InputLabel>
            <TextField
              name="ingredients"
              onChange={handleChange}
              value={inputs.ingredients}
              margin="auto"
              variant="outlined"
            />
            <InputLabel>Instruction</InputLabel>
            <TextField
              name="instruction"
              onChange={handleChange}
              value={inputs.instruction}
              margin="auto"
              variant="outlined"
            />
            <InputLabel>image</InputLabel>
            <TextField
              name="image"
              onChange={handleChange}
              value={inputs.image}
              margin="auto"
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
      )}
    </div>
  );
};

export default RecipeDetail;
