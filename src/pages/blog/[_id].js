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
        <meta name="description" content={blogs?.description} />
        <meta property="og:title" content={blogs?.title} />
        <meta property="og:description" content={blogs?.description} />
        <meta property="og:image" content={blogs?.thumbnail} />
        <meta property="og:url" content={blogs?.thumbnail} />
        <meta property="canonical" content={blogs?.thumbnail} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="article" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        <meta
          name="description"
          content={blogs?.description}
        />
        <link rel="author" href="https://milankatira.vercel.app/" />
        <meta name="author" content="Milan katira" />
        <meta
          name="keywords"
          content="nextjs,react,typescript,tailwindcss,express,nodejs,mongodb,mysql,javascript,docker,github,Milan katira,kubernetes,solidity developer,Reetesh kumar blog,Full Stack Developer,Web Developer,how to use walletconnect in next.js"
        />
        <meta name="robots" content="index, follow" />
        <link rel="assets" href={blogs?.thumbnail} />
        <link
          rel="canonical"
          href={`https://milankatira.vercel.app/blog/${_id}/`}
        />
        <link
          rel="alternate"
          hrefLang="en-US"
          href="https://milankatira.vercel.app"
        />
        <meta property="og:title" content={blogs?.title} />
        <meta property="og:description" content={blogs?.description} />
        <meta
          property="og:url"
          content={`https://milankatira.vercel.app/blog/${_id}/`}
        />
        <meta property="og:site_name" content="Milan katira" />
        <meta property="og:image" content={blogs?.thumbnail} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@milankatira26" />
        <meta name="twitter:title" content={blogs?.title} />
        <meta name="twitter:description" content={blogs?.description} />
        <meta name="twitter:image" content={blogs?.thumbnail} />

        <meta name="next-size-adjust" />

        <meta name="googlebot" content="index, follow" />
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
