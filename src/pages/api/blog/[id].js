// pages/api/blog/[id].js

import connectDB from "../../../utils/db";
import BlogPost from "../../../model/index";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB(); // Connect to MongoDB

  switch (method) {
    case "GET":
      try {
         const query = { title: new RegExp(id, "i") };

        const post = await BlogPost.find(query);
        if (!post) {
          return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(200).json(post[0]);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
