/* eslint-disable @typescript-eslint/ban-ts-comment */
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import SectionTitle from "./design/SectionTitle";
function ContactUs() {

  const [loading, setloading] = useState(false);

  const form = useRef();
  const submitForm = (e: { preventDefault: () => void }) => {

    setloading(true);
    e.preventDefault();
    // @ts-ignore
    emailjs.sendForm("service_a3j1ncp", "template_kyotqu5", form.current, "OELPiSYjiMixDJ_jb").then(
      (result) => {

        setloading(false);
        toast.success("thanks, email send successfully");

      },
      (error) => {

        setloading(false);
        console.log(error.text);

      },
    );

  };
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
                  {/* @ts-ignore */}
                  <form ref={form} onSubmit={submitForm}>
                    <div className="w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-600 dark:text-gray-300 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        className="border-0 px-3 py-3 placeholder-gray-300 dark:bg-gray-900 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-700"
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
                        required
                        type="email"
                        name="email"
                        className="border-0 px-3 py-3 placeholder-gray-300 dark:bg-gray-900 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-700"
                        placeholder="Email"
                      />
                    </div>

                    <div className="w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 dark:text-gray-300 text-xs font-bold mb-2 ease-linear transition-all duration-700"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        cols={80}
                        name="message"
                        className="border-0 px-3 py-3 placeholder-gray-300 dark:bg-gray-900 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-700"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="w-52 border-2 dark:border-white border-black hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white text-sm font-bold uppercase px-6 py-3 rounded  hover:shadow-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300"
                        type="submit"
                      >
                        {loading
                          ? (
                              <svg className="mx-auto h-6 w-6 animate-spin" viewBox="3 3 18 18">
                                <path
                                  className="fill-gray-200"
                                  d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                                ></path>
                                <path
                                  className="fill-gray-800"
                                  d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                                ></path>
                              </svg>
                            )
                          : (
                              "Send Message"
                            )}
                      </button>
                    </div>
                  </form>
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
function useStatw(second: any): [any, any] {

  throw new Error("Function not implemented.");

}
