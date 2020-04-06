import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";
import loginImg from "../images/login.svg";

export default class Login extends React.Component {

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="login-header"><TranslatableText dictionary={{ua: "Увійти", ru: "Войти", gb: "Login"}}/></div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} alt="login-img"/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username"><TranslatableText dictionary={{ua: "Ім'я користувача", ru: "Имя пользователя", gb: "Username"}}/></label>
                            <input type="text" name="username" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pasword"><TranslatableText dictionary={{ua: "Пароль", ru: "Пароль", gb: "Password"}}/></label>
                            <input type="password" name="password" placeholder=""/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn">
                        <TranslatableText dictionary={{ua: "Увійти", ru: "Войти", gb: "Login"}}/>
                    </button>
                </div>
            </div>
        )
    }
}