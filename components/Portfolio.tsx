import { motion } from "framer-motion";
import React from "react";
import SectionTitle from "./design/SectionTitle";

function Portfolio() {

  return (
    <div className="h-full pt-20">
      <SectionTitle text="Blog" />
      <motion.section
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="pt-20 pb-10 lg:pt-[120px] lg:pb-20"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap sm:w-[90%] w-full items-center justify-center mx-auto">
            <div className="w-full px-1 md:w-1/2 lg:w-1/3">
              <div className="mx-auto mb-10 lg:mb-0 max-w-[370px]">
                <a
                  className="m-story"
                  href="https://medium.com/@milankatira26/getting-start-with-django-8d6d84c9d472"
                />
              </div>
            </div>

            <div className="w-full px-1 md:w-1/2 lg:w-1/3">
              <div className="mx-auto mb-10 lg:mb-0 max-w-[370px]">
                <a
                  className="m-story"
                  href="https://medium.com/@milankatira26/react-testing-using-react-testing-library-1072e14d1308"
                />
              </div>
            </div>

            <div className="w-full px-1 md:w-1/2 lg:w-1/3">
              <div className="mx-auto mb-10 lg:mb-0 max-w-[370px]">
                <a className="m-story" href="https://medium.com/@milankatira26/context-api-in-react-e53e4e41295e" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );

}

export default Portfolio;
