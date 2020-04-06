import { TranslatableText } from "../langChanger/index.jsx";
import React from 'react';

export default class Register extends React.Component {

    render() {
        return (
            <div className="base-container">
                <div className="login-header"><TranslatableText dictionary={{ua: "Реєстрація", ru: "Регистрация", gb: "Register"}}/></div>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username"><TranslatableText dictionary={{ua: "Ім'я користувача", ru: "Имя пользователя", gb: "Username"}}/></label>
                            <input type="text" name="username" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"><TranslatableText dictionary={{ua: "Пошта", ru: "Почта", gb: "Email"}}/></label>
                            <input type="text" name="email" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="telphone"><TranslatableText dictionary={{ua: "Телефон", ru: "Телефон", gb: "Telephone"}}/></label>
                            <input type="text" name="telphone" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="company"><TranslatableText dictionary={{ua: "Компанія", ru: "Компания", gb: "Company"}}/></label>
                            <input type="text" name="company" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pasword"><TranslatableText dictionary={{ua: "Пароль", ru: "Пароль", gb: "Password"}}/></label>
                            <input type="password" name="password" placeholder=""/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn">
                        <TranslatableText dictionary={{ua: "Реєстрація", ru: "Регистрация", gb: "Register"}}/>
                    </button>
                </div>
            </div>
        )
    }
}