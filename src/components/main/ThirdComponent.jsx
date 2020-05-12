import React from "react";
import { TranslatableText } from "../langChanger/index.jsx";

export default () => {
  return (
    <div>
        <div className="reasons-container">
            <h1 className="title">
                <TranslatableText 
                    dictionary={{
                        ua: "Причини обрати нас",
                        ru: "Причины выбрать нас",
                        gb: "Reasons to choose us"
                    }}
                />
            </h1>
            <div className="blocks-container">
                <div className="left-side-blocks">
                <div className="block block-green">
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
                                ua: "Правильно оформлене креслення ми ріжемо вже в день замовлення",
                                ru: "Правильно оформленый чертёж мы режем уже в день заказа",
                                gb: "Properly executed drawing we cut already on the day of order"
                            }}
                        />
                    </p>
                </div>
                </div>
                <div className="right-side-blocks">
                <div className="block-big block-blue">
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
                                ua: "Наш ЧПУ лазер ріже листовий метал з точністю аж до 0,005 мм.",
                                ru: "Наш ЧПУ лазер режет листовой метал с точностью вплоть до 0,005 мм.",
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
        {/* <div className="container mt-5 pt-4">
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
                                    ua: "Наш ЧПУ лазер ріже листовий метал з точністю аж до 0,005 мм.",
                                    ru: "Наш ЧПУ лазер режет листовой метал с точностью вплоть до 0,005 мм.",
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
        </div> */}
    </div>
  );
};