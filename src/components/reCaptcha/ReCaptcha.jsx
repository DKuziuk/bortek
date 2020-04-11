import React from 'react';
// import ReactDOM from 'react-dom';
import ReCAPTCHA from "react-google-recaptcha";
 
// function onChange(value) {
//   console.log("Captcha value:", value);
// }

export default class ReCaptcha extends React.Component {
    render() {
        return (
            <ReCAPTCHA
                sitekey="6LfMDOgUAAAAANITdXMPhwq2IPquki7-ss3gnonb"
                // onChange={onChange}
            />
        )
    }
}