/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import React from "react";
import Split from "./Split";

const Blog = ({ subBG, blogs }) => {
  return (
    <section className={`blog-grid section-padding ${subBG ? "sub-bg" : ""}`}>
      <div className="container">
        <div className="sec-head custom-font text-center">
          <h6 className="wow fadeIn" data-wow-delay=".5s">
            Latest News
          </h6>
          <Split>
            <h3 className="wow words chars splitting" data-splitting>
              Our Blogs.
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
                    <img src={i.thumbnail} alt="" />
                  </div>
                  <div className="cont">
                    <Link href="/blog/blog-dark" legacyBehavior>
                      <a className="date custom-font">
                        <span>
                          <i>{moment(i.createdAt).date()}</i>{" "}
                          {moment(i.createdAt).format("MMMM")}
                        </span>
                      </a>
                    </Link>
                    <div className="info custom-font">
                      <Link href="/blog/blog-dark" legacyBehavior>
                        <a className="tag">{i?.tags?.join(", ")}</a>
                      </Link>
                    </div>

                    <h6>
                      <Link
                        href="/blog-details/blog-details-dark"
                        legacyBehavior
                      >
                        {i.title}
                      </Link>
                    </h6>
                    <div className="btn-more custom-font">
                      <Link href={`/blog/${i._id}`} legacyBehavior>
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
