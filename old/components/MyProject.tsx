import React from "react";
import { SocialIcon } from "react-social-icons";
import SectionTitle from "./design/SectionTitle";
import { Projects } from "../constant/Projects";

const MyProject = () => {

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-6 sm:px-20 py-24 mx-auto">
          <SectionTitle text="project" />
          <div className="flex flex-wrap">
            {Projects.map((data) => (
              <div key={data.title} className="hover:-mt-4 transition-all duration-700 xl:w-1/3 lg:w-1/2 py-4 px-2">
                <div className="bg-blue-50 dark:bg-gray-900 p-6 rounded-xl">
                  <img className="h-40 rounded w-full object-cover object-center" src={data.img} alt="content" />
                  <h2 className="text-lg text-gray-900 dark:text-gray-300  font-medium title-font">{data.title}</h2>
                  <p className="leading-relaxed text-base">{data.description}</p>
                  <div className="flex justify-start mt-2">
                    <a href={data.url} className="flex">
                      <svg
                        className="h-6 w-6 my-auto fill-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                      </svg>
                    </a>

                    {data.github && <SocialIcon bgColor="transparent" fgColor="gray" url={data.github} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

};

export default MyProject;
