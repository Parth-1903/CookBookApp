import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User Already exist!" });
  }
  const hashPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashPassword,
    receipe: [],
    likes: []
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};

export const login = async(req,res) => {
    const {email,password} = req.body;
    let checkUser;
    try{
        checkUser = await User.findOne({email})
    }catch(err){
        res.status(400).json({message:"error"})
    }

    if(!checkUser){
        return res.status(404).json({message:"Couldn't Find User from this Email"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,checkUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"});
    }
    return res.status(200).json({message:"Login Successfull", user:checkUser})
};