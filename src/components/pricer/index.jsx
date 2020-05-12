import React from 'react';
import PriceFunc from './priceFunc';
import './style.css';

export default class Pricer extends React.Component {
    render() {
        let testObj = {
            orders: [
                {
                    id: 1,
                    file: {name: 'Реторта. Кронштейн зажима.dxf'},
                    material: '310S(20Х23Н18)',
                    thickness: '8,0',
                    amount: '420',
                    priority: 'highPriority',
                    commentary: 'СГЦМ. Реторта. Кронштейн',
                    svg: 'Макет'
                },
                {
                    id: 1,
                    file: {name: 'Реторта. Кронштейн зажима.dxf'},
                    material: '310S(20Х23Н18)',
                    thickness: '8,0',
                    amount: '420',
                    priority: 'highPriority',
                    commentary: 'СГЦМ. Реторта. Кронштейн',
                    svg: 'Макет'
                },
                {
                    id: 1,
                    file: {name: 'Реторта. Кронштейн зажима.dxf'},
                    material: '310S(20Х23Н18)',
                    thickness: '8,0',
                    amount: '420',
                    priority: 'highPriority',
                    commentary: 'СГЦМ. Реторта. Кронштейн',
                    svg: 'Макет'
                },
                {
                    id: 1,
                    file: {name: 'Реторта. Кронштейн зажима.dxf'},
                    material: '310S(20Х23Н18)',
                    thickness: '8,0',
                    amount: '420',
                    priority: 'highPriority',
                    commentary: 'СГЦМ. Реторта. Кронштейн',
                    svg: 'Макет'
                },
                {
                    id: 1,
                    file: {name: 'Реторта. Кронштейн зажима.dxf'},
                    material: '310S(20Х23Н18)',
                    thickness: '8,0',
                    amount: '420',
                    priority: 'highPriority',
                    commentary: 'СГЦМ. Реторта. Кронштейн',
                    svg: 'Макет'
                }
            ],
            orderNumber: 20112,
            orderPrice: 1500.00,
            orderAmount: 2,
            orderDate: "27 квітня 2020 р.",
            nameOfBuyer: `ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "ВИРОБНИЧЕ ПІДПРИЄМСТВО "ДТУ"`,
            telOfBuyer: "+380509224684",
            shippingAddress: "Адреси поки немає :("
        }
        let PricePage = PriceFunc(testObj);
        return (
            <div>
                {PricePage}
            </div>
            );
    }
}