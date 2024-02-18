import React from "react";
import Blog from "../components/blog";
import axiosInstance from "../utils/axiosInstance";

const BlogDetailsDark = ({ blogs }) => {
  return (
    <>
      <Blog blogs={blogs} />
    </>
  );
};

export default BlogDetailsDark;

export async function getServerSideProps() {
  try {
    const response = await axiosInstance.get("/blog"); // Replace with your actual API endpoint
    const blogs = response.data; // Assuming your API returns an array of blog objects

    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return {
      props: {
        blogs: [],
      },
    };
  }
}
