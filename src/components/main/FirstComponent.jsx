import React from "react";
import { TranslatableText } from "../langChanger/index.jsx";

export default () => {
  return (
    <div className="banner-big">
        <div className="white-wave">
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
                        ua: "Виготовимо деталі з різного металу \n за вашии кресленнями",
                        ru: "Изготовим детали из различного металла \n по вашим чертежам.",
                        gb: "We will cut details from various metal according to \n your drawings."
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
  );
};