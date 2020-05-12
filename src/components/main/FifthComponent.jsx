import React from "react";
import { TranslatableText } from "../langChanger/index.jsx";

export default () => {
  return (
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
  );
};