import Head from "next/head";
import React from "react";
import Markdown from "../../components/Markdown";
import axiosInstance from "../../utils/axiosInstance";
import { revertSlug } from "../../utils/slug";

const BlogDetailsDark = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>{blogs?.title}</title>
        {/* <meta name="description" content={blogs?.description} />
        <meta property="og:title" content={blogs?.title} />
        <meta property="og:description" content={blogs?.description} />
        <meta property="og:image" content={blogs?.thumbnail} />
        <meta property="og:url" content={blogs?.thumbnail} />
        <meta property="cononical" content={blogs?.thumbnail} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="article" /> */}

        <meta name="description" content="Typescript first Zod validation" />

        <meta property="og:url" content="https://milankatira.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Milan katira " />
        <meta
          property="og:description"
          content="Typescript first Zod validation"
        />

        <meta
          property="og:image"
          content="https://ogcdn.net/6064b869-74ed-4eb9-b76c-0b701ffe7e6b/v4/milankatira.vercel.app/Milan%20katira%20/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2F81f73567-4925-469e-8ceb-811e913fb437.png%3Ftoken%3Dp_jQnYgzdQtFtk6OVPmjom3UMxfuW5FGYh4vhcfvgQI%26height%3D600%26width%3D600%26expires%3D33244802807/og.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="milankatira.vercel.app" />
        <meta
          property="twitter:url"
          content="https://milankatira.vercel.app/"
        />
        <meta name="twitter:title" content="Milan katira " />
        <meta
          name="twitter:description"
          content="Typescript first Zod validation"
        />
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
