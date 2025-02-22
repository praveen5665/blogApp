import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import UserModel from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });
import fs from 'fs';


const app = express();

app.use(cors({credentials:true, origin:'http://localhost:5173'}));    
app.use(express.json());
app.use(cookieParser())

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
     res.cookie('token',token).json({
      id:user._id,
      username,
      message: "Login successful" 
     });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      res.json({
          userInfo : {username: decoded.username}
      });
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });
  

app.post('/logout', (req,res) => {
  res.cookie('token',"").json('ok')
})

app.post('/post',uploadMiddleware.single('file'), (req, res) => {
  const {originalname} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);
  res.json({ext});
})

app.listen(Port, () => {
    console.log(`app is listening on Port : ${Port}`);
})