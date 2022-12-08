import React from "react";
import SectionTitle from "./design/SectionTitle";

const Portfolio = () => {
  return (
    <div className="h-screen pt-20">
      <SectionTitle text="Blog" />

      <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mx-auto mb-10 max-w-[370px]">
                <a
                  className="m-story"
                  href="https://medium.com/@milankatira26/getting-start-with-django-8d6d84c9d472"
                >
                  Getting start with django
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
