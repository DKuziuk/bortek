import React from "react";
import { TranslatableText } from "../langChanger/index.jsx";
import CopyIcon from "../images/Copy.svg"
import copy from 'copy-to-clipboard';

export default () => {
  return (
    <div className="contact-us">
        <h1 className="title">
            <TranslatableText 
                dictionary={{
                    ua: "Залишились питання?",
                    ru: "Остались вопросы?",
                    gb: "You still have a question?"
                }}
            />
        </h1>
        <p className="title-description">
            <TranslatableText 
                dictionary={{
                    ua: "Зателефонуйте до нас прямо зараз або надішліть електронного листа:",
                    ru: "Позвоните нам прямо сейчас или напишите электронное письмо:",
                    gb: "Call us right now or use e-mail to contact us:"
                }}
            />
        </p>
        <div className="tel-e-mail">
            <button onClick={() => copy('380504628219')}>
            +380 (50) 462-8219 <img style={{width: '16px'}} src={CopyIcon} alt="Click to copy me!"/>
            </button>
            <button onClick={() => copy('bortek@ukr.net')}>
            bortek@ukr.net <img style={{width: '16px'}} src={CopyIcon} alt="Click to copy me!"/>
            </button>
        </div>
    </div>
  );
};