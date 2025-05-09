/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toSlug } from "../utils/slug";
import Split from "./Split";

const Blog = ({ subBG, blogs }) => {

  return (
    <section className={`blog-grid section-padding ${subBG ? "sub-bg" : ""}`}>
      <div className="container">
        <div className="sec-head custom-font text-center">
          <h6 className="wow fadeIn" data-wow-delay=".5s">
            Latest Blogs
          </h6>
          <Split>
            <h3 className="wow words chars splitting" data-splitting>
              My Blogs.
            </h3>
          </Split>
          <span className="tbg">Blogs</span>
        </div>
        <div className="row">
          {blogs &&
            blogs.length > 0 &&
            blogs.map((i) => (
              <div key={i} className="col-lg-4 mt-30">
                <div
                  className="item list md-mb50 wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="img">
                    <Image
                      src={i.thumbnail}
                      alt=""
                      loading="lazy"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="cont">
                    <a className="date custom-font">
                      <span>
                        <i>{moment(i.createdAt).date()}</i>{" "}
                        {moment(i.createdAt).format("MMMM")}
                      </span>
                    </a>
                    <div className="info custom-font">
                      <a className="tag">{i?.tags?.join(", ")}</a>
                    </div>

                    <h6>
                      <Link href={`/blog/${toSlug(i.title)}`} legacyBehavior>
                        {i.title}
                      </Link>
                    </h6>
                    <div className="btn-more custom-font">
                      <Link href={`/blog/${toSlug(i.title)}`} legacyBehavior>
                        <a className="simple-btn">Read More</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
