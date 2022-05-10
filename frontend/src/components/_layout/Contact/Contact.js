import React from "react";

// Classes
import classes from "./Contact.module.css";

// Icons
import { AiFillFacebook } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { MdMail, MdPhoneAndroid } from "react-icons/md";

const Contact = () => {
  return (
    <div className={classes.contact}>
      <div className={[classes.contact__item, classes["contact__item--wide"]].join(" ")}>
        <MdPhoneAndroid size={30} />
        <a className={classes.contact__link} href="tel:601 990 448">
          601 990 448
        </a>
      </div>
      <div className={classes.contact__item}>
        <MdMail size={30} />
        <a className={classes.contact__link} href="mailto:chelmskaligasquasha@gmail.com">
          chelmskaligasquasha@gmail.com
        </a>
      </div>
      <div className={classes.contact__line}></div>
      <div className={classes.contact__item}>
        <AiFillFacebook size={30} />
        <a className={classes.contact__link} href="https://www.facebook.com/groups/882935985241480" target="_blank" rel="noopener noreferrer">
          Dołącz do nas na Facebooku
        </a>
      </div>
      <div className={classes.contact__item}>
        <FaYoutube size={30} />
        <a className={classes.contact__link} href="https://www.youtube.com/channel/UCO6zujSZHWj60rw5X8sZKeA/videos" target="_blank" rel="noopener noreferrer">
          Odwiedź nasz kanał na YouTube
        </a>
      </div>
    </div>
  );
};

export default Contact;
