import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import UserModel from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors({credentials:true, origin:'http://localhost:5173'}));    
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blogApp').then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Could not connect to MongoDB', err));


const Port = process.env.PORT || 4000;

app.get('/test', (req, res) => {
    res.json("Good");
})


app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!password) {
        return res.status(400).json({ message: "Password is required." });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({ username, password: hashedPassword });
      res.json(user.username);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      
      const passOk = await bcrypt.compare(password, user.password);
      
      if (!passOk) {
        return res.status(400).json({ message: "Invalid password" });
      }
    
     const token = jwt.sign({username, id:user._id}, process.env.SECRET);
     res.cookie('token',token);
    res.json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

app.listen(Port, () => {
    console.log(`app is listening on Port : ${Port}`);
})