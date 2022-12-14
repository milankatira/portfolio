import { motion } from "framer-motion";
import React from "react";
import SectionTitle from "./design/SectionTitle";

function ContactUs() {

  return (
    <div className="h-screen pt-20">
      <SectionTitle text="Contact Us" />
      <section className="py-0 lg:py-24 lg:pt-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-0 sm:px-40">
              <motion.div
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col min-w-0 break-words mx-auto mb-6 shadow-lg rounded-lg "
              >
                <div className="flex-auto p-5 lg:p-10">
                  <h4 className="text-2xl font-semibold">Want to work with us?</h4>

                  <div className="w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-gray-600 dark:text-gray-300 text-xs font-bold mb-2"
                      htmlFor="full-name"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 dark:bg-gray-900 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 dark:text-gray-300 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-300 dark:bg-gray-900 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 dark:text-gray-300 text-xs font-bold mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      rows={4}
                      cols={80}
                      className="border-0 px-3 py-3 placeholder-gray-300 dark:bg-gray-900 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Type a message..."
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blue-800 text-white active:bg-black text-sm font-bold uppercase px-6 py-3 rounded  hover:shadow-2xl hover:opacity-80 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300"
                      type="button"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default ContactUs;
