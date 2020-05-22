import { TranslatableText } from "../langChanger/index.jsx";
import React from 'react';
import loginImg from "../images/login.svg";
// import ReCaptcha from "../reCaptcha/ReCaptcha";

export default class Register extends React.Component {
    email = React.createRef();
    password = React.createRef();
    paswordConfirme = React.createRef();

    checkValidation = () => {
        if (this.email.current.value && this.password.current.value && this.password.current.value === this.paswordConfirme.current.value) {
            return true;
        } else return false;
    }
    
    registerFunc = () => {
        if (this.checkValidation()) {
            var xhr = new XMLHttpRequest();
            const email = this.email.current.value;
            const pwd = this.password.current.value;
            var params = 'email=' + encodeURIComponent(email) + '&pwd=' + encodeURIComponent(pwd);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        alert('Дякую. Ми відправили Вам на пошту повідомлення з посиланням для підтвердження реєстрації.')
                    } else {
                        this.props.createNotification(xhr.status);
                        console.log(JSON.parse(xhr.responseText));
                    }
                }
            }
            xhr.open("POST", '/login/signup/?' + params, true);
            xhr.send();
        } else {
            this.props.createNotification(400);
        }
    }

    render() {
        return (
            <div className="base-container">
                {/* <ReCaptcha /> */}
                <div className="login-header"><TranslatableText dictionary={{ua: "Реєстрація", ru: "Регистрация", gb: "Register"}}/></div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} alt="login-img"/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email"><TranslatableText dictionary={{ua: "Пошта", ru: "Почта", gb: "Email"}}/></label>
                            <input ref={this.email} type="text" name="email" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pasword"><TranslatableText dictionary={{ua: "Пароль", ru: "Пароль", gb: "Password"}}/></label>
                            <input ref={this.password} type="password" name="password" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="paswordConfirme"><TranslatableText dictionary={{ua: "Підтвердження пароля", ru: "Подтверждение пароля", gb: "Password confirmation"}}/></label>
                            <input ref={this.paswordConfirme} type="password" name="paswordConfirme" placeholder=""/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={this.registerFunc}>
                        <TranslatableText dictionary={{ua: "Реєстрація", ru: "Регистрация", gb: "Register"}}/>
                    </button>
                </div>
            </div>
        )
    }
}