import React from "react";
import Split from "../Split";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { toast } from "react-hot-toast";

const ContactSection = () => {

  const messageRef = React.useRef(null);

  const form = useRef();
  const submitForm = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_a3j1ncp", "template_kyotqu5", form.current, "OELPiSYjiMixDJ_jb").then(
      (result) => {
        console.log(result,"result")
        toast.success("thanks, email send successfully");
      },
      (error) => {

        console.log(error.text);

      },
    );

  };
  const sendMessage = (value) =>{
    submitForm(value)
  } ;

  return (
    <section className="contact-sec section-padding">
      <div className="container">
        <div className="sec-head custom-font text-center">
          <h6 className="wow fadeIn" data-wow-delay=".5s">
            Get In Touch
          </h6>
          <Split>
            <h3 className="wow words chars splitting" data-splitting>
              Contact Me.
            </h3>
          </Split>
          <span className="tbg">Contact</span>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="form wow fadeInUp" data-wow-delay=".5s">
        
                    <div className="messages" ref={messageRef}></div>
<form ref={form} onSubmit={submitForm}>

                    <div className="controls">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              id="form_name"
                              type="text"
                              name="name"
                              placeholder="Name"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              id="form_email"
                              type="email"
                              name="email"
                              placeholder="Email"
                              required="required"
                            />
                        
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <input
                             type="textarea"
                              id="form_message"
                              placeholder="Message"
                              required
                              rows={4}
                              cols={80}
                              name="message"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="text-center">
                            <button
                              type="submit"
                              className="simple-btn custom-font cursor-pointer"
                            >
                              <span>Send Message</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
</form>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
