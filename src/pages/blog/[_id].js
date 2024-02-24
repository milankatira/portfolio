import { NextSeo } from "next-seo";
import Head from "next/head";
import React from "react";
import Markdown from "../../components/Markdown";
import { revertSlug } from "../../utils/slug";

const BlogDetailsDark = ({ blogs }) => {
  return (
    <>
      <NextSeo
        title={blogs?.title}
        description={blogs?.description}
        openGraph={{
          title: blogs?.title,
          description: blogs?.description,
          images: [
            {
              url: blogs?.thumbnail,
              width: 800,
              height: 600,
              alt: "Thumbnail",
            },
          ],
          url: "https://milankatira.vercel.app",
          type: "article",
        }}
      />
      <Head>
        <title>{blogs?.title}</title>
        <meta name="description" content={blogs?.description} />
        <meta property="og:title" content={blogs?.title} />
        <meta property="og:description" content={blogs?.description} />
        <meta property="og:image" content={blogs?.thumbnail} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:url" content="https://milankatira.vercel.app" />
        <meta property="og:type" content="article"></meta>
      </Head>
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

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { _id } = params;
    const response = await axiosInstance.get(`/blog/${revertSlug(_id)}`);
    const blogs = response.data;
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
