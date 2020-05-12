import React from "react";
import { TranslatableText } from "../langChanger/index.jsx";

export default () => {
  return (
    <div className="steps">
        <div className="up-row">
            <div className="step" style={{backgroundColor: '#b4ecde'}}>
                <h2>1</h2>
                <h3>
                    <TranslatableText 
                        dictionary={{
                            ua: "Підготуйте креслення Вашої деталі",
                            ru: "Подготовьте чертёж Вашей детали",
                            gb: "Prepare a drawing of your detail"
                        }}
                    />
                </h3>
                <div className="step-details">
                    <TranslatableText 
                        dictionary={{
                            ua: "На першому етапі слід правильно оформити креслення: \n - креслення повинно бути у форматі DXF; \n - всі лінії різки повинні бути замкнутими, білого кольору; \n - лінії граверування повинні бути красного кольору. \n",
                            ru: "На первом этапе следует правильно оформить чертёж: \n — чертёж должен быть в формате DXF; \n — все линии резки должны быть замкнутыми, белого цвета; \n — линии гравировки должны быть красного цвета. \n",
                            gb: "In the first stage the drawing should be correctly made out: \n - the drawing must be in DXF format; \n - all cutting lines should be closed, white; \n - Engraving lines must be red. \n"
                        }}
                    />
                </div>
            </div>
            <div className="step" style={{backgroundColor: '#ffdf7f'}}>
                <h2>2</h2>
                <h3>
                    <TranslatableText 
                        dictionary={{
                            ua: "Підберіть матеріал та інші параметри замовлення",
                            ru: "Подберите материал и другие параметры заказа",
                            gb: "Select material and other order options"
                        }}
                    />
                </h3>
                <div className="step-details">
                <TranslatableText 
                        dictionary={{
                            ua: "Ми пропонуємо до вибору 3 матеріали:\n - Ст3;\n - 304S(08Х18Н10);\n - 310S(20Х23Н18).\n Можлива товщина матеріалу (в мм):\n 0,8; 1,5; 3,0; 6,0; 8,0.\n Обмеження листа металу:\n 2400мм Х 1800мм",
                            ru: "На первом этапе следует правильно оформить чертёж: \n — чертёж должен быть в формате DXF; \n — все линии резки должны быть замкнутыми, белого цвета; \n — линии гравировки должны быть красного цвета. \n",
                            gb: "In the first stage the drawing should be correctly made out: \n - the drawing must be in DXF format; \n - all cutting lines should be closed, white; \n - Engraving lines must be red. \n"
                        }}
                    />
                </div>
            </div>
            <div className="step" style={{backgroundColor: '#f7dfe7'}}>
                <h2>3</h2>
                <h3>
                    <TranslatableText 
                        dictionary={{
                            ua: "Отримайте якісний продукт",
                            ru: "Получите качественный продукт",
                            gb: "Get a high quality product."
                        }}
                    />
                </h3>
                <div className="step-details">
                    <TranslatableText 
                        dictionary={{
                            ua: "Жодного разу ми не підвели довіру наших клієнтів",
                            ru: "Мы ни разу не подвели доверие своих клиентов",
                            gb: "We have never failed to trust our customers."
                        }}
                    />
                </div>
            </div>
        </div>
        <div className="down-row">
            <div className="first-step"></div>
            <div className="second-step"></div>
            <div className="third-step"></div>
        </div>
    </div>
  );
};