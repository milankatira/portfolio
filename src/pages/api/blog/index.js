// pages/api/blog/index.js

import BlogPost from "../../../model/index";
import connectDB from "../../../utils/db";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  if (method === "GET") {
    try {
      const posts = await BlogPost.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
