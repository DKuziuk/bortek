import "./styles/fonts.css";
import "./styles/main.css";
import bannerImage from "../images/laser-cutting.jpg";
import { LanguageChanger } from "../langChanger/index.jsx";
import { TranslatableText } from "../langChanger/index.jsx";
import React from 'react';

export default class Main extends React.Component {
    render() {
        return (
            <div className="general-content">
                <LanguageChanger />
                <div className="container-fluid background-wave">
                <div className="row">
                    <div className="container banner">
                    <header className="row align-items-center justify-content-between header">
                        <nav className="col offset-1">
                        <ul className="list-unstyled d-flex align-items-center m-0">
                            <li className="mr-3">
                            <a href="#order" className="link">Stories</a>
                            </li>
                            <li className="mr-3">
                            <a href="#order" className="link">Company</a>
                            </li>
                            <li className="mr-3">
                            <a href="#order" className="link">About</a>
                            </li>
                            <li>
                            <a href="#order" className="link">Contact</a>
                            </li>
                        </ul>
                        </nav>
                        <div className="col">
                        <div className="d-flex align-items-center justify-content-end">
                            <div className="mr-4">
                            +380 (50) 462-8219
                            </div>
                            <a href="http://www.bortek.ua/" className="link link-large link-active">
                            Бортек
                            </a>
                        </div>
                        </div>
                    </header>
                    <section className="position-relative row align-items-center">
                        <div className="col offset-1">
                        <img className="banner-bg" src={bannerImage} alt="" />
                        <div className="banner-content position-relative">
                            <h1 className="title">
                                <TranslatableText 
                                    dictionary={{
                                        ua: "Професійний сервіс \n лазерної різки",
                                        ru: "Профессиональный сервис \n лазерной резки",
                                        gb: "Professional lasser cutting \n service"
                                    }}
                                />
                            </h1>
                            <p className="title-description">
                                <TranslatableText 
                                    dictionary={{
                                        ua: "Ріжемо вироби з різного металу \n по вашим кресленням",
                                        ru: "Режем изделия из различного металла \n по вашим чертежам.",
                                        gb: "We cut products from various metal according to \n your drawings."
                                    }}
                                />
                            </p>
                            <a href="#order" className="order-btn title">
                                <TranslatableText 
                                    dictionary={{
                                        ua: "Перейти до замовлення",
                                        ru: "Перейти к заказу",
                                        gb: "Go to order"
                                    }}
                                />
                            </a>
                        </div>
                        </div>
                    </section>
                    </div>
                </div>
                </div>
                <div className="container mb-5">
                <div className="row">
                    <div className="col offset-1">
                    <h1 className="title">
                        <TranslatableText 
                            dictionary={{
                                ua: "Причини обрати нас",
                                ru: "Причины выбрать нас",
                                gb: "Reasons to choose us"
                            }}
                        />
                    </h1>
                    <p className="title-description">
                        <TranslatableText 
                            dictionary={{
                                ua: "Окрім нашої прихильності до ідеалу, є кілька ключових атрибутів, котрі визначають хто ми і чим \n відрізняємось від інших",
                                ru: "Помимо нашей приверженности к совершенству, есть несколько ключевых атрибутов, которые определяют кто мы и чем \n отличаемся от остальных.",
                                gb: "In addition to our commitment to excellence, there are several key attributes that determine who we are and how we differ \n from the rest."
                            }}
                        />
                    </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col offset-1">
                    <div className="row">
                        <div className="col">
                        <div className="block block-green mb-4">
                            <h2>
                                <TranslatableText 
                                    dictionary={{
                                        ua: "– Постійна підтримка",
                                        ru: "– Постоянная поддержка",
                                        gb: "– Ongoing support"
                                    }}
                                />
                            </h2>
                        </div>
                        <div className="block-big block-yellow">
                            <h3>
                                <TranslatableText 
                                    dictionary={{
                                        ua: "– Швидкість роботи",
                                        ru: "– Скорость работы",
                                        gb: "– Speed of work"
                                    }}
                                />
                            </h3>
                            <p>
                                <TranslatableText 
                                    dictionary={{
                                        ua: "Правильно оформлене креслення ми ріжемо \n вже в день замовлення",
                                        ru: "Правильно оформленый чертёж мы режем \n уже в день заказа",
                                        gb: "Properly executed drawing we cut \n already on the day of order"
                                    }}
                                />
                            </p>
                        </div>
                        </div>
                        <div className="col">
                        <div className="block-big block-blue mb-4">
                            <h3>
                                <TranslatableText 
                                    dictionary={{
                                        ua: "– Висока якість роботи",
                                        ru: "– Высокое качество работы",
                                        gb: "– High quality work"
                                    }}
                                />
                            </h3>
                            <p>
                                <TranslatableText 
                                    dictionary={{
                                        ua: "Наш ЧПУ лазер дає можливість виконувати різання листового матеріалу з точністю аж до 0,005 мм.",
                                        ru: "Наш ЧПУ лазер позволяет выполнять резку листового материала с точностью вплоть до 0,005 мм.",
                                        gb: "Our CNC laser allows to cut sheet material with an accuracy of up to 0.005 mm."
                                    }}
                                />
                            </p>
                        </div>
                        <div className="block block-pink">
                            <h2>
                                <TranslatableText 
                                    dictionary={{
                                        ua: "– Справедлива ціна",
                                        ru: "– Справедливая цена",
                                        gb: "– True price"
                                    }}
                                />
                            </h2>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="container mb-5">
                <div className="row">
                    <div className="col offset-1">
                    <h1 className="title">
                        <TranslatableText 
                            dictionary={{
                                ua: "Як оформити замовлення",
                                ru: "Как оформить заказ",
                                gb: "How to place an order"
                            }}
                        />
                    </h1>
                    <p className="title-description">
                        <TranslatableText 
                            dictionary={{
                                ua: "Швидкість і якість нашої роботи безпосередньо залежить від оформлення Вами замовлення, \n тому рекоммендуємо ознайомитися з інструкцією, описаною нижче",
                                ru: "Скорость и качество нашей работы напрямую зависит от оформления Вами заказа, \n по-этому, рекоммендуем ознакомиться с инструкцией, описаной ниже",
                                gb: "The speed and quality of our work directly depends on your order placement, \n therefore, we recommend that you read the instructions described below"
                            }}
                        />
                    </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col offset-1">
                    <ul className="classNamees">
                        <li>
                        <p className="title-description">
                        <TranslatableText 
                            dictionary={{
                                ua: "На першому етапі слід правильно оформити креслення: \n - креслення повинно бути у форматі DXF; \n - всі лінії різки повинні бути замкнутими, білого кольору; \n - лінії граверування повинні бути красного кольору. \n",
                                ru: "На первом этапе следует правильно оформить чертёж: \n — чертёж должен быть в формате DXF; \n — все линии резки должны быть замкнутыми, белого цвета; \n — линии гравировки должны быть красного цвета. \n",
                                gb: "In the first stage the drawing should be correctly made out: \n - the drawing must be in DXF format; \n - all cutting lines should be closed, white; \n - Engraving lines must be red. \n"
                            }}
                        />
                        </p>
                        </li>
                        <li>
                        <p className="title-description">
                            <TranslatableText 
                                dictionary={{
                                    ua: "Далі потрібно вибрати матеріал, товщину так кількість віробів",
                                    ru: "Далее нужно выбрать материал, толщину и колиство изделий",
                                    gb: "Next, you need to choose the material, thickness and number of products"
                                }}
                            />
                        </p>
                        </li>
                        <li>
                        <p className="title-description">
                            <TranslatableText 
                                dictionary={{
                                    ua: "Заповнену форму відправити нам",
                                    ru: "Заполненную форму отправить нам",
                                    gb: "Send us the completed form"
                                }}
                            />
                        </p>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="container mb-5">
                <div className="row">
                    <div className="col offset-1">
                    <h1 className="title" id="order">
                        <TranslatableText 
                            dictionary={{
                                ua: "Зробіть своє замовлення вже зараз",
                                ru: "Сделайте свой заказ уже сейчас",
                                gb: "Make your order now"
                            }}
                        />
                    </h1>
                    <p className="title-description">
                        <TranslatableText 
                            dictionary={{
                                ua: "Перед заповненням форми просимо ознайомитись з правилами оформлення",
                                ru: "Перед заполнением формы просим ознакомиться с правилами оформления",
                                gb: "Before filling in the form, please read the design rules"
                            }}
                        />
                    </p>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}