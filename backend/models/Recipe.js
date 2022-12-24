import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    ingredients:{
        type:String,
        required:true,
    },
    instruction:{
        type:String,
        required:true,
    },
    image: {
        type:String,
        required:false,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
},
{
    timestamps: true,
});

export default mongoose.model("Recipe",recipeSchema)