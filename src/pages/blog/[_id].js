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
        <meta property="cononical" content={blogs?.thumbnail} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="article" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          href="https://www.googletagmanager.com/gtag/js?id=G-XY0Y1HDGMT"
          as="script"
        />
        <title>
          Web3 Wallets connection using WalletConnect in Next.js | Reetesh Kumar
        </title>
        <meta
          name="description"
          content="WalletConnect allows to connect mobile wallet to different decentralized applications and other wallets. This allows to interact with dapps and sign transactions securely from wallet."
        />
        <link rel="author" href="https://reetesh.in/" />
        <meta name="author" content="Reetesh Kumar" />
        <meta
          name="keywords"
          content="nextjs,react,typescript,tailwindcss,express,nodejs,mongodb,mysql,javascript,docker,github,Reetesh Kumar,kubernetes,solidity developer,Reetesh kumar blog,Full Stack Developer,Web Developer,how to use walletconnect in next.js,metamask connection in next.js using walletconnect,how to setup walletconnect in next.js,walletconnect in next.js"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="assets"
          href="https://res.cloudinary.com/dw6wav4jg/image/upload/v1708271565/walletconnect_p28rex.png"
        />
        <link
          rel="canonical"
          href="https://milankatira.vercel.app/blog/typescript-first-zod-validation/"
        />
        <link rel="alternate" hrefLang="en-US" href="https://reetesh.in/" />
        <meta
          property="og:title"
          content="Web3 Wallets connection using WalletConnect in Next.js"
        />
        <meta
          property="og:description"
          content="WalletConnect allows to connect mobile wallet to different decentralized applications and other wallets. This allows to interact with dapps and sign transactions securely from wallet."
        />
        <meta
          property="og:url"
          content="https://milankatira.vercel.app/blog/typescript-first-zod-validation/"
        />
        <meta property="og:site_name" content="Reetesh Kumar" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dw6wav4jg/image/upload/v1708271565/walletconnect_p28rex.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@imbitcoinb" />
        <meta
          name="twitter:title"
          content="Web3 Wallets connection using WalletConnect in Next.js | Reetesh Kumar"
        />
        <meta
          name="twitter:description"
          content="WalletConnect allows to connect mobile wallet to different decentralized applications and other wallets. This allows to interact with dapps and sign transactions securely from wallet."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dw6wav4jg/image/upload/v1708271565/walletconnect_p28rex.png"
        />
       
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
