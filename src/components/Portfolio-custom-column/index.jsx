/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import initIsotope from "../../common/initIsotope";
import portfolio1Data from "../../data/sections/portfolio1.json";
import Split from "../Split";

const PortfolioCustomColumn = ({
  column,
  filterPosition,
  hideFilter,
  hideSectionTitle,
}) => {
  const [pageLoaded, setPageLoaded] = React.useState(false);
  React.useEffect(() => {
    setPageLoaded(true);
    if (pageLoaded) {
      setTimeout(() => {
        initIsotope();
      }, 1000);
    }
  }, [pageLoaded]);
  return (
    <section className="portfolio section-padding pb-70">
      {!hideSectionTitle && (
        <div className="container">
          <div className="sec-head custom-font">
            <h6 className="wow fadeIn" data-wow-delay=".5s">
              Portfolio
            </h6>
            <Split>
              <h3 className="wow words chars splitting" data-splitting>
                My Works.
              </h3>
            </Split>
            <span className="tbg text-right">Portfolio</span>
          </div>
        </div>
      )}

      <div className={`${column === 3 ? "container-fluid" : "container"}`}>
        <div className="row">
          {!hideFilter && (
            <div
              className={`filtering ${
                filterPosition === "center"
                  ? "text-center"
                  : filterPosition === "left"
                  ? "text-left"
                  : "text-right"
              } col-12`}
            >
              <div className="filter">
                <span data-filter="*" className="active">
                  All
                </span>
                <span data-filter=".blockchain">Blockchain</span>
                <span data-filter=".mobile">Mobile App</span>
                <span data-filter=".web">Web Development</span>
              </div>
            </div>
          )}

          <div className="gallery full-width">
            {portfolio1Data.map((item, index) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`${"col-md-6"} items ${
                    item.filterCategory
                  } wow fadeInUp ${"lg-mr"}`}
                  data-wow-delay=".4s"
                >
                  <div className="item-img">
                    <a className="imago wow">
                      <img
                        src={item.image}
                        alt="image"
                        style={{ height: "400px", width: "400px" , objectFit:"contain" }}
                      />
                      <div className="item-img-overlay"></div>
                    </a>
                  </div>
                  <div className="cont">
                    <h6>{item.title}</h6>
                    <span>
                      {item.tags.map((tag, index) => (
                        <React.Fragment key={index * 3}>
                          <Link href="/works4/works4-dark">{tag}</Link>
                          {index == item.tags.length - 1 ? "" : ","}
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCustomColumn;
