import React from 'react';
import { LanguageProvider } from "./components/langChanger/index.jsx";
import Main from './components/main/index';
import Header from './components/header/index';
import LoginForm from './components/login/index';
import Order from './components/order/index';
import Pricer from './components/pricer/index';
// import News from './components/news/index';
import { Route, HashRouter } from 'react-router-dom';
import "./App.css";

export default class App extends React.Component {
    state = {
        isLogged: false
    }
    logIn = () => {
        this.setState({
            isLogged: true
        })
    }
    logOut = () => {
        this.setState({
            isLogged: false
        })
    }
    render() {
        return (
            <HashRouter>
                <LanguageProvider className="all">
                    <Header isLogged={this.state.isLogged} logOut={this.logOut} />
                    <Route path="/mainpage" component={Main} />
                    <Route path="/loginform" render={(props) => <LoginForm {...props} logIn={this.logIn} />} />
                    <Route path="/order" component={Order} />
                    <Route path="/pricer" component={Pricer} />
                    {/* <News /> */}
                </LanguageProvider>
            </HashRouter>
        );
    }
}