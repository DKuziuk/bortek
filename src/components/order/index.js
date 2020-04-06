import React from 'react';
import OrderChanger from './OrderChanger';
import OrderCreator from './OrderCreator';
import OrderList from './OrdersList';
import _ from 'lodash'; // Сортировка, источник: https://abcinblog.blogspot.com/2019/02/react-i.html
import "./style.css";

export default class Order extends React.Component {
    state = {
        orders: [
            {
                id: 0,
                file: {name: 'Имя файла'},
                material: 'Материал',
                thickness: 'Толщина',
                amount: 'К-во',
                priority: 'Приоритет',
                commentary: 'Комментарий',
                svg: 'Макет'
            }
        ],
        changeOrder: {},
        changing: false,
        changingRow: -1,
        styleOfOrderCreator: {},
        sort: 'asc',  // 'desc'
        sortField: 'id', // поле по умолчанию
    };
    dxfToSvg = file => {
        console.log(`Файл ${file} получен.`);
        return (
        <svg style={{width: '100%', height: '100%'}}>
            <g>
                <rect xmlns="http://www.w3.org/2000/svg" stroke="#000" id="svg_3" height="100%" width="100%" y="0" x="0" fillOpacity="null" strokeOpacity="null" strokeWidth="1" fill="#fff"/>
                <ellipse xmlns="http://www.w3.org/2000/svg" stroke="#ff0000" ry="50" rx="50" id="svg_1" cy="50%" cx="50%" strokeWidth="1" fill="#ff0000"/>
            </g>
        </svg>
        );
    }
    addOrder = (files, material, thickness, amount, priority, commentary) => {
        let orderList = this.state.orders;
        for (let i=0; i<files.length; i++) {
            const newOrder = {
                id: this.state.orders.length,
                file: files[i],
                material,
                thickness,
                amount,
                priority,
                commentary,
                svg: this.dxfToSvg(files[i])
            }
            orderList.push(newOrder);
        }
        this.setState({orders: orderList});
    }
    changeRow = e => {
        let { id } = e.target;
        let { orders } = this.state;
        let changedOrder = orders.find(order => order.id === +id);
        this.setState({changingRow: +id});
        this.setState({changeOrder: changedOrder});
        this.setState({changing: true});
        this.setState({styleOfOrderCreator: {display: 'none'}});
    }
    saveChangedOrder = (id, file, material, thickness, amount, priority, commentary) => {
        let changedOrders = this.state.orders.map(order => {
            if (order.id === id) {
                order = {
                    id,
                    file,
                    material,
                    thickness,
                    amount,
                    priority,
                    commentary,
                    svg: this.state.orders[id].svg
                }
            };
            return order;
        });
        this.setState({changingRow: -1});
        this.setState({orders: changedOrders});
        this.setState({changing: false});
        this.setState({styleOfOrderCreator: {}});
    }
    cancelChangedOrder = () => {
        this.setState({changingRow: -1});
        this.setState({changing: false});
        this.setState({styleOfOrderCreator: {}});
    }
    deleteOrder = e => {
        let { id } = e.target;
        let { orders } = this.state;
        let deletedOrder = orders.find(order => order.id === +id);
        let deletedId = orders.findIndex(order => order === deletedOrder);
        orders.splice(deletedId, 1);
        for (let i=0; i<orders.length; i++) {
            if(orders[i].id > id) {
                orders[i].id--
            }
        }
        this.setState({orders});
        this.setState({changingRow: -1});
        this.setState({changing: false});
        this.setState({styleOfOrderCreator: {}});
    }
    submitAllOrders = (e) => {
        e.preventDefault();
        if (this.state.orders.length !== 1) {
            // const cloneData = this.state.orders.concat();
            // const orders = _.orderBy(cloneData, 'id', 'asc');
            // this.setState({
            //     orders
            // })
            console.log(this.state.orders);
            this.setState({
                orders: [
                    {
                        id: 0,
                        file: {name: 'Имя файла'},
                        material: 'Материал',
                        thickness: 'Толщина',
                        amount: 'К-во',
                        priority: 'Приоритет',
                        commentary: 'Комментарий',
                        svg: 'Макет'
                    }
                ]
            })
        }
    }

    onSort = sortField => {
        const cloneData = this.state.orders.concat();
        cloneData.splice(0, 1);
        const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
        const orderedData = _.orderBy(cloneData, sortField, sortType);
        orderedData.unshift({
            id: 0,
            file: {name: 'Имя файла'},
            material: 'Материал',
            thickness: 'Толщина',
            amount: 'К-во',
            priority: 'Приоритет',
            commentary: 'Комментарий',
            svg: 'Макет'
        });
        this.setState({
            orders: orderedData,
            sort: sortType,
            sortField
        })
    }

    render() {
        return (
            <div className="order">
                {this.state.changing && <OrderChanger 
                changeOrder={this.state.changeOrder} 
                cancelChangedOrder={this.cancelChangedOrder} 
                saveChangedOrder={this.saveChangedOrder} 
                />}
                <div style={this.state.styleOfOrderCreator}><OrderCreator submit={this.addOrder} /></div>
                <OrderList 
                changingRow={this.state.changingRow} 
                orders={this.state.orders} 
                changeRow={this.changeRow} 
                deleteOrder={this.deleteOrder} 
                submitAllOrders={this.submitAllOrders}
                sort={this.state.sort}
                sortField={this.state.sortField}
                onSort={this.onSort}
                />
            </div>
        );
    }
}