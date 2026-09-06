import { useState } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bhavishaykumar09@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:bhavishaykumar09@gmail.com" data-cursor="disable">
                bhavishaykumar09@gmail.com
              </a>
            </p>
            <button
              onClick={handleCopyEmail}
              className="copy-email-btn"
              data-cursor="disable"
              type="button"
            >
              {copied ? (
                <>
                  <FaCheck /> Copied!
                </>
              ) : (
                <>
                  <FaRegCopy /> Copy Email
                </>
              )}
            </button>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/bhavishay09"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github (@bhavishay09) <MdArrowOutward />
            </a>
            <a
              href="https://x.com/bk81919"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter / X (@bk81919) <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/bk78277/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram (@bk78277) <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/bhavishay-kumar-48595333a/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin (Bhavishay Kumar) <MdArrowOutward />
            </a>
            <a
              href="mailto:bhavishaykumar09@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email Directly <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Bhavishay Kumar</span>
            </h2>
            <h5>
              <MdCopyright /> 2025 Bhavishay Kumar. All rights reserved.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
