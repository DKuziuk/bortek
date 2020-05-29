import React from 'react';
import { LanguageProvider } from "./components/langChanger/index.jsx";
import Main from './components/main/index';
import Header from './components/header/index';
import LoginForm from './components/login/index';
import Order from './components/order/index';
import Pricer from './components/pricer/index';
// import News from './components/news/index';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import "./App.css";

export default class App extends React.Component {
    state = {
        isAuthorized: false,
        token: '',
        userEmail: ''
    }
     
    logIn = (token, userEmail) => {
        this.setState({
            isAuthorized: true,
            token,
            userEmail
        });
    }
    logOut = () => {
        this.setState({
            isAuthorized: false,
            token: '',
            userEmail: ''
        })
    }
    
    render() {
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.state.isAuthorized === true
                ? <Component {...props} token={this.state.token}/>
                : <Redirect to={{
                    pathname: "/loginform",
                    state: { from: props.location }
                  }} />
            )} />
        )
        return (
            <HashRouter>
                <LanguageProvider className="all">
                    <Header isAuthorized={this.state.isAuthorized} logOut={this.logOut} userEmail={this.state.userEmail} />
                    <Route exact path="/" component={Main} />
                    <Route path="/loginform" render={(props) => <LoginForm {...props} logIn={this.logIn} />} />
                    <PrivateRoute path="/order" component={Order} />
                    <Route path="/pricer" component={Pricer} />
                    {/* <News /> */}
                </LanguageProvider>
            </HashRouter>
        );
    }
}