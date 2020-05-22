import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";

export default class Login extends React.Component {
    state = {
        leftSide: false,
        className: "notification"
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (typeof nextProps.leftSide != 'undefined') {
            if (nextProps.leftSide === false) {
                this.setState({leftSide: nextProps.leftSide, className: "rightNotification"});
            } else {
                this.setState({leftSide: nextProps.leftSide, className: "notification"});
            }
        }
    }
    render() {
        const { err400, err403, err404, err409, err449, err500 } = this.props.errors;
        return (
            <div className="errors">
                {err400 && <div className={this.state.className}><span><TranslatableText dictionary={{ua: "Помилка заповнення форми", ru: "Ошибка заполнения формы", gb: "Filling form error"}}/></span></div>}
                {err403 && <div className={this.state.className}><span><TranslatableText dictionary={{ua: "Невірний пароль", ru: "Неверный пароль", gb: "Wrong password"}}/></span></div>}
                {err404 && <div className={this.state.className}><span><TranslatableText dictionary={{ua: "Користувач не знайдений", ru: "Пользователь не найден", gb: "User not found"}}/></span></div>}
                {err409 && <div className={this.state.className}><span><TranslatableText dictionary={{ua: "Користувач вже зареєстрований", ru: "Пользователь уже зарегистрирован", gb: "User is already registered"}}/></span></div>}
                {err449 && <div className={this.state.className}><span><TranslatableText dictionary={{ua: "Підтвердіть свою пошту", ru: "Подтвердите свою почту", gb: "Confirm your e-mail"}}/></span></div>}
                {err500 && <div className={this.state.className}><span><TranslatableText dictionary={{ua: "Помилка бази даних", ru: "Ошибка базы данных", gb: "DataBase error"}}/></span></div>}
            </div>
        )
    }
}