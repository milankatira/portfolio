import mongoose from "mongoose";

const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
