import React from "react";
import Markdown from "../../components/Markdown";
import axiosInstance from "../../utils/axiosInstance";
import { revertSlug } from "../../utils/slug";
import { commonMetaData } from "../../utils/commonMetaData";

const BlogDetailsDark = ({ blogs }) => {
  return (
    <>
      <section className="page-header blg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              <div className="cont text-center">
                <h2>{blogs?.title}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <Markdown content={blogs?.content} />
      </div>
    </>
  );
};

export default BlogDetailsDark;
export async function generateMetadata({ blogs }) {
  const metadata = commonMetaData({
    name: blogs.title,
    desc: blogs.description,
    image: blogs.thumbnail,
    url: "https://milankatira.vercel.app",
  });
  return metadata;
}
export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { _id } = params;
    const response = await axiosInstance.get(`/blog/${revertSlug(_id)}`); // Replace with your actual API endpoint
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
