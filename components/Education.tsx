import React from 'react'
import SectionTitle from './design/SectionTitle';

const Education = () => {
  return (
    <div className="sm:ml-24 ml-8 h-screen pt-20">
      <SectionTitle text="Education" />
      <section className="text-gray-600 body-font flex flex-col">
        <div className="container w-full flex flex-wrap">
          <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mr-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
              1
            </div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-white text-indigo-500 rounded-full inline-flex items-center justify-center">
                <img
                  src="https://www.joonsquare.com/usermanage/image/business/v-v-p-engineering-college-rajkot-14337/v-v-p-engineering-college-rajkot-logo.png"
                  className="p-5"
                />
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                  Bechlor in Engineering •2021
                </h2>
                <p className="leading-relaxed">
                  V.V.P Engineering college,Rajkot
                </p>
                <p className="leading-relaxed">Jan 2022 - Present</p>
              </div>
            </div>
          </div>
          <div className="flex relative pb-20 sm:items-center md:w-2/3 mr-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className="h-4/5 w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
              2
            </div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-white text-indigo-500 rounded-full inline-flex items-center justify-center">
                <img
                  src="https://images.shiksha.com/mediadata/images/1589346152phpKJZJ6Z.jpeg"
                  className="p-5"
                />
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                  Diploma in Engineering •2018
                </h2>
                <p className="leading-relaxed">
                  Government polytechnic porbandar
                </p>
                <p className="leading-relaxed">Oce 2021 - Dec 2021</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Education