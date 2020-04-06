import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
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
        };
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
        const { isLogginActive } = this.state;
        const current = isLogginActive ? <TranslatableText dictionary={{ua: "Реєстрація", ru: "Регистрация", gb: "Register"}}/> : <TranslatableText dictionary={{ua: "Увійти", ru: "Войти", gb: "Login"}}/>;
        return (
            <div className="App">
                <div className="login">
                    <div className="container" ref={ref => (this.container = ref)}>
                        {isLogginActive && <Login containerRef={ref => this.current = ref} />}
                        {!isLogginActive && <Register containerRef={ref => this.current = ref} />}
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