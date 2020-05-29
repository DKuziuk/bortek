import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import ErrorNotification from "./ErrorNotification.jsx";
import { Redirect } from 'react-router-dom';
import "./style.css";

const RightSide = props => {
    return (
        <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive: true,
            errors: {
                err400: false,
                err403: false,
                err404: false,
                err409: false,
                err449: false
            },
            redirectToReferrer: false
        };
    }
    changeRedirectState = () => {
        this.setState({redirectToReferrer: true});
    }
    createNotification = errorCode => {
            this.setState(prevState => ({
                errors: {
                ...prevState.errors,
                ["err" + errorCode]: true
                }
              }))
            setTimeout(() => {
                this.setState(prevState => ({
                    errors: {
                    ...prevState.errors,
                    ["err" + errorCode]: false
                    }
                  }))
            }, 1800)
    }

    componentDidMount() {
        this.rightSide.classList.add("right");
    }

    changeState() {
        const { isLogginActive } = this.state;
        if(isLogginActive) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
        }

        this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }))
    }

    render() {
        const { isLogginActive, errors } = this.state;
        const current = isLogginActive ? <TranslatableText dictionary={{ua: "Реєстрація", ru: "Регистрация", gb: "Register"}}/> : <TranslatableText dictionary={{ua: "Увійти", ru: "Войти", gb: "Login"}}/>;
        
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }
        
        return (
            <div className="App">
                <ErrorNotification errors={errors} leftSide={isLogginActive}/>
                <div className="login">
                    <div className="container" ref={ref => (this.container = ref)}>
                        {isLogginActive && <Login containerRef={ref => this.current = ref} logIn={this.props.logIn} createNotification={this.createNotification} changeRedirectState={this.changeRedirectState} />}
                        {!isLogginActive && <Register containerRef={ref => this.current = ref} createNotification={this.createNotification} />}
                    </div>
                    <RightSide
                    current={current}
                    containerRef={ref => this.rightSide = ref}
                    onClick={this.changeState.bind(this)}
                    />
                </div>
            </div>
        );
    }
}