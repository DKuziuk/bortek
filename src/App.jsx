import React from 'react';
import { LanguageProvider } from "./components/langChanger/index.jsx";
// import Main from './components/main/index';
// import LoginForm from './components/login/index';
import Order from './components/order/index';
// import News from './components/news/index';
import "./App.css";

export default class App extends React.Component {

    render() {
        return (
            <LanguageProvider className="all">
                {/* <Main /> */}
                {/* <News /> */}
                {/* <LoginForm /> */}
                <Order />
            </LanguageProvider>
        );
    }
}