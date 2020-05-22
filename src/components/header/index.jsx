import React from 'react';
import { Link } from "react-router-dom";
import { LanguageChanger } from "../langChanger/index.jsx";
import Home from "../images/Home.svg";
import CreateOrder from "../images/CreateOrder.svg";
import Profile from "../images/Profile.svg";
import LangIcon from "../images/Lang.svg";
import { TranslatableText } from "../langChanger/index.jsx";
import "./style.css";

export default class Header extends React.Component {
    render() {
        return (
            <div className="headerFixed">
                <div><a href="http://www.bortek.ua/"><b><TranslatableText dictionary={{ua: 'Бортек', ru: 'Бортек', gb: 'Bortek'}}/></b></a></div>
                <ul className="headerList">
                    <Link to="/mainpage"className=""><li>
                        <TranslatableText dictionary={{ua: 'Головна сторінка', ru: 'Главная страница', gb: 'Main page'}}/>
                        <img style={{width: '16px', marginLeft: '6px'}} src={Home} alt="Home"/>
                    </li></Link>
                    <Link to="/order"className=""><li>
                        <TranslatableText dictionary={{ua: 'Зробити замовлення', ru: 'Сделать заказ', gb: 'Make an order'}}/>
                        <img style={{width: '16px', marginLeft: '6px'}} src={CreateOrder} alt="CreateOrder"/>
                    </li></Link>
                    <Link to="/pricer"className=""><li>
                        <TranslatableText dictionary={{ua: 'Особистий кабінет', ru: 'Личный кабинет', gb: 'My profile'}}/>
                        <img style={{width: '16px', marginLeft: '6px'}} src={Profile} alt="Profile"/>
                    </li></Link>
                </ul>
                <div>
                    <div className="logg">
                        {
                            !this.props.isAuthorized &&
                            <Link to="/loginform"><TranslatableText dictionary={{ua: 'Увійти', ru: 'Войти', gb: 'Login'}}/></Link>
                        }
                    </div>
                    {
                        this.props.isAuthorized &&
                        <div className="logg">
                            <span>{this.props.userEmail}</span>
                            <a href="#/mainpage" onClick={this.props.logOut}><TranslatableText dictionary={{ua: 'Вийти', ru: 'Выйти', gb: 'Log out'}}/></a>
                            {/* <button onClick={this.props.logOut}>Вийти</button> */}
                        </div>
                    }
                </div>
                <div style={{display: 'flex', marginRight: '20px'}}>
                    <LanguageChanger />
                    <img src={LangIcon} alt="Change language"/>
                </div>
            </div>
        );
    }
}