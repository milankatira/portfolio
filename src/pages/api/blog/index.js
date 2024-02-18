// pages/api/blog/index.js

import connectDB from "../../../utils/db";
import BlogPost from "../../../model/index";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB(); // Connect to MongoDB

  switch (method) {
    case "GET":
      try {
        const posts = await BlogPost.find();
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
