import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Post from './model/post.js';


mongoose.connect(process.env.MONGODB_KEY)
  .then(() => {
    console.log('connected to mongoDB');
  }).catch(() => {
    console.log('connection failed');
});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});
app.post('/api/posts',(req, res)=>{
//const post = req.body;
const post = new Post({
   title:req.body.title,
  content:req.body.content,
})
  console.log(post);
post.save();

res.status(201).json({
  success: true,
});
})

app.get('/api/posts',(req, res,) =>{
  const post= [
    {id:'id1', title:'first server side title',content:'first server side content'},
    {id:'id2', title:'second server side title',content:'second server side content'},
    {id:'id3', title:'third server side title',content:'third server side content'},
  ]
  res.status(200).json({success: true,data:post});
});
export default app;



