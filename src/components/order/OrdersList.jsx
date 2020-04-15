import React from 'react';
import PropTypes from 'prop-types';
import { TranslatableText } from "../langChanger/index.jsx";
import EditIcon from "../images/EditIcon.svg";
import DeleteIcon from "../images/DeleteIcon.svg";
import ArrowDn from "../images/ArrowDn.svg";
import ArrowUp from "../images/ArrowUp.svg";
import './style.css';

export default class OrderList extends React.Component {
    static propTypes = {
        orders: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                file: PropTypes.object.isRequired,
                material: PropTypes.string.isRequired,
                thickness: PropTypes.string.isRequired,
                amount: PropTypes.string.isRequired
            }).isRequired
        ).isRequired,
        changeRow: PropTypes.func.isRequired,
        changingRow: PropTypes.number.isRequired,
        deleteOrder: PropTypes.func.isRequired,
        submitAllOrders: PropTypes.func.isRequired
    }
    static defaultProps = {
        orders: []
    }

    render() {
        const {orders, changeRow,  deleteOrder, submitAllOrders, changingRow, sort, sortField, onSort} = this.props;
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
                    return <TranslatableText dictionary={{ua: "Низький", ru: "Низкий", gb: "Low"}}/>
                case 'mediumPriority':
                    return <TranslatableText dictionary={{ua: "Середній", ru: "Средний", gb: "Medium"}}/>
                case 'highPriority':
                    return <TranslatableText dictionary={{ua: "Високий", ru: "Высокий", gb: "High"}}/>
                default:
                  return value
            }
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th style={{width: '3%'}} onClick={onSort.bind(null, 'id')}>№{sortField === 'id' ? sort === 'asc' ? <img src={ArrowUp} alt="Sorted"/> : <img src={ArrowDn} alt="Sorted"/> : null}</th>
                        <th style={{width: '23%'}} onClick={onSort.bind(null, 'file.name')}><TranslatableText dictionary={{ua: "Назва файла", ru: "Название файла", gb: "File name"}}/>{sortField === 'file.name' ? sort === 'asc' ? <img src={ArrowDn} alt="Sorted"/> : <img src={ArrowUp} alt="Sorted"/> : null}</th>
                        <th style={{width: '10%'}} onClick={onSort.bind(null, 'material')}><TranslatableText dictionary={{ua: "Матеріал", ru: "Материал", gb: "Material"}}/>{sortField === 'material' ? sort === 'asc' ? <img src={ArrowDn} alt="Sorted"/> : <img src={ArrowUp} alt="Sorted"/> : null}</th>
                        <th style={{width: '9%'}} onClick={onSort.bind(null, 'thickness')}><TranslatableText dictionary={{ua: "Товщина, мм", ru: "Толщина, мм", gb: "Thickness, mm"}}/>{sortField === 'thickness' ? sort === 'asc' ? <img src={ArrowDn} alt="Sorted"/> : <img src={ArrowUp} alt="Sorted"/> : null}</th>
                        <th style={{width: '4%'}} onClick={onSort.bind(null, 'amount')}><TranslatableText dictionary={{ua: "К-ть, шт.", ru: "К-во, шт.", gb: "Amount, pcs."}}/>{sortField === 'amount' ? sort === 'asc' ? <img src={ArrowDn} alt="Sorted"/> : <img src={ArrowUp} alt="Sorted"/> : null}</th>
                        <th style={{width: '8%'}} onClick={onSort.bind(null, 'priority')}><TranslatableText dictionary={{ua: "Пріорітет", ru: "Приоритет", gb: "Priority"}}/>{sortField === 'priority' ? sort === 'asc' ? <img src={ArrowDn} alt="Sorted"/> : <img src={ArrowUp} alt="Sorted"/> : null}</th>
                        <th style={{width: '10%'}} onClick={onSort.bind(null, 'commentary')}><TranslatableText dictionary={{ua: "Коментар", ru: "Комментарий", gb: "Commentary"}}/>{sortField === 'commentary' ? sort === 'asc' ? <img src={ArrowDn} alt="Sorted"/> : <img src={ArrowUp} alt="Sorted"/> : null}</th>
                        <th style={{width: '9%'}}><TranslatableText dictionary={{ua: "Інструменти", ru: "Инструменты", gb: "Tools"}}/></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        const {id, file, material, thickness, amount, priority, commentary} = order;
                        if(id!==0) {
                            return (
                                <tr key={id} className={changingRow === id ? "rowSelected" : "" }>
                                    <th>
                                        {id}
                                    </th>
                                    <td id={id} onClick={e => changeRow(e)}>
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
                                    <td style={{overflow: 'auto'}}>
                                        {valueToString(commentary)}
                                    </td>
                                    <td>
                                        <button id={id} className="tools-btn" onClick={e => changeRow(e)}><img id={id} src={EditIcon} alt="Edit"/></button>
                                        <button id={id} className="tools-btn" onClick={e => deleteOrder(e)}><img id={id} src={DeleteIcon} alt="Delete"/></button>
                                    </td>
                                </tr>
                            );
                        } else return null;
                    })}
                </tbody>
                <tfoot>
                    <tr><td colSpan="8"><button type="button" onClick={e => submitAllOrders(e)}><TranslatableText dictionary={{ua: "Відправити замовлення", ru: "Отправить заказ", gb: "Make an order"}}/></button></td></tr>
                </tfoot>
            </table>
        );
    }
}