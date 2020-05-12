import React from 'react';
import PrintIcon from "../images/PrintIcon.svg"
let priceToString = price => {
    function num_letters(k, d) {  // целое число прописью, это основа
        var i = '', e = [
            ['','тисяч','мільйон','мільярд','трильйон'], ['а','і',''], ['','а','ів']
        ];
        if (k === '' || k === '0') return ' нуль'; // 0
        k = k.split(/(?=(?:\d{3})+$)/);  // разбить число в массив с трёхзначными числами
        if (k[0].length === 1) k[0] = '00'+k[0];
        if (k[0].length === 2) k[0] = '0'+k[0];
        for (var j = (k.length - 1); j >= 0; j--) {  // соединить трёхзначные числа в одно число, добавив названия разрядов с окончаниями
            if (k[j] !== '000') {
                i = (((d && j === (k.length - 1)) || j === (k.length - 2)) && (k[j][2] === '1' || k[j][2] === '2') ? t(k[j],1) : t(k[j])) + declOfNum(k[j], e[0][k.length - 1 - j], (j === (k.length - 2) ? e[1] : e[2])) + i;
            }
        }
        function t(k, d) {  // преобразовать трёхзначные числа
            var e = [
                ['',' один',' два',' три',' чотири',' п\'ять',' шість',' сім',' вісім',' дев\'ять'],
                [' десять',' одинадцять',' дванадцять',' тринадцять',' чотирнадцять',' п\'ятнадцять',' шістнадцять',' сімнадцять',' вісімнадцять',' дев\'ятнадцять'],
                ['','',' двадцять',' тридцять',' сорок',' п\'ятдесят',' шістдесят',' сімдесят',' вісімдесят',' дев\'яносто'],
                ['',' сто',' двісті',' триста',' чотириста',' п\'ятсот',' шістсот',' сімсот',' вісімсот',' дев\'ятсот'],
                ['',' одна',' дві']
            ];
            return e[3][k[0]] + (k[1] === 1 ? e[1][k[2]] : e[2][k[1]] + (d ? e[4][k[2]] : e[0][k[2]]));
        }
        return i;
    }
    function declOfNum(n, t, o) {  // склонение именительных рядом с числительным: число (typeof = string), корень (не пустой), окончание
        var k = [2,0,1,1,1,2,2,2,2,2];
        return (t === '' ? '' : ' ' + t + (n[n.length-2] === "1"?o[2]:o[k[n[n.length-1]]]));
    }
    function razUp(e) {  // сделать первую букву заглавной и убрать лишний первый пробел
        return e[1].toUpperCase() + e.substring(2);
    }
    function sum_letters(a) {
        a = Number(a).toFixed(2).split('.');  // округлить до сотых и сделать массив двух чисел: до точки и после неё
        return razUp(num_letters(a[0]) + declOfNum(a[0], 'грив', ['ня','ні','ень']) + ' ' + a[1] + declOfNum(a[1], 'копі', ['йка','йки','йок']));
    }
        let strPrice = sum_letters(price);
        return strPrice
}
let printFunc = () => {
    window.print();
}
let toNiceNumber = number => {
    if ((number ^ 0) === number) {
        return number.toLocaleString()+".00";
    } else {
        return number.toLocaleString();
    }
}
let valueToString = value => {
    switch(value) {
        case '08Х18Н10':
            return "304S(08Х18Н10)"
        case '20Х23Н18':
            return "310S(20Х23Н18)"
        case 'blackST':
            return "Ст3"
        case 'mm-08':
            return "0,8"
        case 'mm-15':
            return "1,5"
        case 'mm-30':
            return "3,0"
        case 'mm-60':
            return "6,0"
        case 'mm-80':
            return "8,0"
        case 'lowPriority':
            return "!"
            // return <TranslatableText dictionary={{ua: "Низький", ru: "Низкий", gb: "Low"}}/>
        case 'mediumPriority':
            return "! !"
            // return <TranslatableText dictionary={{ua: "Середній", ru: "Средний", gb: "Medium"}}/>
        case 'highPriority':
            return "! ! !"
            // return <TranslatableText dictionary={{ua: "Високий", ru: "Высокий", gb: "High"}}/>
        default:
          return value
    }
}

export default function Pricer (obj) {
    const { orders, orderNumber, orderDate, nameOfBuyer, telOfBuyer, shippingAddress, orderPrice, orderAmount } = obj;
    let i=0;
    return (
        <div>
            <div id="pricer">
                <div className="pricer">
                    <header>
                        <h6>
                            Увага! Оплата цього рахунку означає погодження з умовами поставки товарів. Повідомлення про оплату є обов'язковим,
                            в іншому випадку не гарантується наявність товарів на складі. Товар відпускається за фактом надходження коштів на 
                            п/р Постачальника, самовивозом, за наявності довіренності та паспорта.
                        </h6>
                        <section>
                            <b>Зразок заповнення платіжного доручення</b>
                            <div className="exampleForm">
                                <div>
                                    <span>Отримувач</span>
                                    <b>ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "БОРТЕК"</b>
                                </div>
                                <div className="codeEDRPOU">
                                    <span>Код</span>
                                    <b>20582102</b>
                                </div>
                                <div className="creditInfo">
                                    <div>
                                        <span>Код отримувача</span>
                                        <b>АТ " Райффайзен Банк Аваль " у м. Києві</b>
                                    </div>
                                    <div>
                                        <span>КРЕДИТ рах. №</span>
                                        <b>UA933808050000000026009159819</b>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </header>
                    <section>
                        <b>Рахунок на оплату № {orderNumber} від {orderDate}</b>
                        <div className="sellerInfo">
                            <span>Постачальник:</span>
                            <p>
                                <b>ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "БОРТЕК"</b>
                                <span>
                                    {`п/р UA933808050000000026009159819 у банку АТ " Райффайзен Банк Аваль " у м. Києві,
                                    УКРАЇНА, 08300, Київська обл., м. Бориспіль, вул. Завокзальна, будинок № 1,
                                    тел.: (04595) 71583, 71216 ; 050 4628219,
                                    код за ЄДРПОУ 20582102, ІПН 205821010049,
                                    Організація є платником податку на прибуток на загальних підставах.
                                    www.bortek.ua;
                                    E-mail: Bortek@ukr.net; E-mail: 0459571216@ukr.net`}
                                </span>
                            </p>
                        </div>
                        <div className="buyerInfo">
                            <span>Покупець:</span>
                            <p>
                                <b>{nameOfBuyer}</b>
                                <span>
                                    {`Тел.: ${telOfBuyer},
                                    адреса доставки: ${shippingAddress}`}
                                </span>
                            </p>
                        </div>
                        <div className="OrderDate">
                            <span>Договір:</span>
                            <span>------- від {orderDate}</span>
                        </div>
                    </section>
                    <section>
                        <table className="priceTable">
                            <thead>
                                <tr style={{textAlign: 'center', backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                                    <th>№</th>
                                    <th>Товари (роботи, послуги)</th>
                                    <th>Кіл-сть</th>
                                    <th>Од.</th>
                                    <th>Ціна без ПДВ</th>
                                    <th>Сума без ПДВ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{textAlign: 'center'}}>1</td>
                                    <td>Деталі з листового металу (за кресленнями покупця)</td>
                                    <td style={{textAlign: 'end'}}>{orderAmount}</td>
                                    <td>кт</td>
                                    <td style={{textAlign: 'end'}}>{toNiceNumber(orderPrice)}</td>
                                    <td style={{textAlign: 'end'}}>{toNiceNumber(orderAmount*orderPrice)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="PDWPrice">
                            <tbody>
                                <tr>
                                    <th>Вього:</th>
                                    <th>{toNiceNumber(orderAmount*orderPrice)}</th>
                                </tr>
                                <tr>
                                    <th>Сума ПДВ:</th>
                                    <th>{toNiceNumber(orderAmount*orderPrice*0.2)}</th>
                                </tr>
                                <tr>
                                    <th>Всього із ПДВ:</th>
                                    <th>{toNiceNumber(orderAmount*orderPrice*1.2)}</th>
                                </tr>
                            </tbody>
                        </table>
                        <span>Всього найменувань 1, на суму {toNiceNumber(orderAmount*orderPrice*1.2)} грн.</span>
                        <span><b>{priceToString(orderAmount*orderPrice*1.2)}</b></span>
                        <span><b>У т.ч. ПДВ: {priceToString(orderAmount*orderPrice*0.2)}</b></span>
                    </section>
                    <div className="didBy">
                        <b>Виписав(ла): </b>
                        <span>Якименко Ольга Володимирівна</span>
                    </div>
                </div>
                <table className="orderList" style={{width: '925px', margin: 'auto'}}>
                <thead>
                    <tr>
                        <th style={{width: '40px'}}>№</th>
                        <th>Назва файлу</th>
                        <th style={{width: '125px'}}>Матеріал</th>
                        <th style={{width: '40px'}}>&#963;, мм</th>
                        <th style={{width: '50px'}}>К-ть, шт.</th>
                        <th style={{width: '40px'}}> ! </th>
                        <th style={{width: '270px'}}>Коментар</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        const {id, file, material, thickness, amount, priority, commentary} = order;
                        if(id!==0) {
                            return (
                                <tr key={++i}>
                                    <th>
                                        {i}
                                    </th>
                                    <td id={id}>
                                        {file.name}
                                    </td>
                                    <td>
                                        {valueToString(material)}
                                    </td>
                                    <td>
                                        {valueToString(thickness)}
                                    </td>
                                    <td>
                                        {valueToString(amount)}
                                    </td>
                                    <td>
                                        {valueToString(priority)}
                                    </td>
                                    <td style={{overflow: 'hidden'}}>
                                        {commentary}
                                    </td>
                                </tr>
                            );
                        } else return null;
                    })}
                </tbody>
            </table>
                <div style={{display: 'flex', flexDirection: 'column', width: '925px', margin: 'auto'}}>
                    <span><b>Примітки:</b></span>
                    <span><b>&#963;</b> &#8213; Товщина;</span>
                    <span><b> ! </b> &#8213; Пріорітет (1 знак означає найнижчий, 3 - найвищий)</span>
                </div>
            </div>
            <div className="submitPricer">
                <button onClick={printFunc}>Друк документу<img style={{width: '32px'}} src={PrintIcon} alt="Print"/></button>
            </div>
        </div>
    );
}