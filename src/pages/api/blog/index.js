
import connectDB from "../../../utils/db";
import BlogPost from "../../../model/index";
const handler = async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === "GET") {
    try {
      const posts = await BlogPost.find({}, { title:1, thumbnail:1, _id:1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
