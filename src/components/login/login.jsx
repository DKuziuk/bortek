import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";
import loginImg from "../images/login.svg";
import LoaderIcon from "../images/LoaderIcon.svg";

export default class Login extends React.Component {
    state = {
        loadingState: false
    }
    email = React.createRef();
    password = React.createRef();
    
    loginFunc = () => {
        var xhr = new XMLHttpRequest();
        const email = this.email.current.value;
        const pwd = this.password.current.value;
        var params = 'email=' + encodeURIComponent(email) + '&pwd=' + encodeURIComponent(pwd);
        xhr.onreadystatechange = () => {
            this.setState({loadingState: true});
            if (xhr.readyState === 4) {
                // запрос завершён
                if (xhr.status === 200) {
                    this.props.logIn(JSON.parse(xhr.responseText).data.token, JSON.parse(xhr.responseText).data.user.email);
                    setTimeout(this.props.changeRedirectState, 100);
                } else {
                    this.props.createNotification(xhr.status);
                }
                this.setState({loadingState: false});
            }
        }
        xhr.open("POST", '/login/?' + params, true);
        xhr.send();
    }

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
                            <label htmlFor="email"><TranslatableText dictionary={{ua: "Пошта", ru: "Почта", gb: "Email"}}/></label>
                            <input ref={this.email} type="email" name="email" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pasword"><TranslatableText dictionary={{ua: "Пароль", ru: "Пароль", gb: "Password"}}/></label>
                            <input ref={this.password} type="password" name="password" placeholder=""/>
                        </div>
                    </div>
                </div>
                <div className="footer" style={{marginTop: '3em'}}>
                    {this.state.loadingState && <button disabled type="button" className="btn-disabled">
                        <TranslatableText dictionary={{ua: "Увійти", ru: "Войти", gb: "Login"}}/>
                    </button>}
                    {this.state.loadingState && <div className="LoaderIcon" dangerouslySetInnerHTML={{ __html: `<img src=${LoaderIcon} />` }}/>}
                    {!this.state.loadingState && <button type="button" className="btn" onClick={this.loginFunc}>
                        <TranslatableText dictionary={{ua: "Увійти", ru: "Войти", gb: "Login"}}/>
                    </button>}
                </div>
            </div>
        )
    }
}