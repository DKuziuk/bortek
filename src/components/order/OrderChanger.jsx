import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";
import "./style.css";

export default class OrderChanger extends React.Component {
    materialHTML = React.createRef();
    thicknessHTML = React.createRef();
    amountHTML = React.createRef();
    priorityHTML = React.createRef();
    commentaryHTML = React.createRef();

    handleSave = event => {
        event.preventDefault();
        const { id, file } = this.props.changeOrder;
        const material = this.materialHTML.current.value;
        const thickness = this.thicknessHTML.current.value;
        const amount = this.amountHTML.current.value;
        const priority = this.priorityHTML.current.value;
        const commentary = this.commentaryHTML.current.value;
        this.props.saveChangedOrder(id, file, material, thickness, amount, priority, commentary);
    }
    render() {
        const { id, file, material, thickness, amount, priority, commentary, svg } = this.props.changeOrder;
        const { cancelChangedOrder } = this.props;

        return(
            <form action="">
                    <div className="leftSide">
                        <div style={{width: '100%', height: '100%', overflow: 'auto'}} dangerouslySetInnerHTML={{__html: svg}} />
                        <span>№ {id}</span>
                        <span>{file.name}</span>
                    </div>
                    <div className="order-options">
                        <span><TranslatableText dictionary={{ua: "Матеріал", ru: "Материал", gb: "Material"}}/></span>
                        <select ref={this.materialHTML} defaultValue={material}>
                            <option value="blackST">Ст3</option>
                            <option value="08Х18Н10">304S(08Х18Н10)</option>
                            <option value="20Х23Н18">310S(20Х23Н18)</option>
                        </select>
                        <span><TranslatableText dictionary={{ua: "Товщина, мм", ru: "Толщина, мм", gb: "Thickness, mm"}}/></span>
                        <select ref={this.thicknessHTML} defaultValue={thickness}>
                            <option value="mm-08">0,8</option>
                            <option value="mm-15">1,5</option>
                            <option value="mm-30">3,0</option>
                            <option value="mm-60">6,0</option>
                            <option value="mm-80">8,0</option>
                        </select>
                        <div className="amount">
                            <span><TranslatableText dictionary={{ua: "Кількість, шт.", ru: "Количество, шт.", gb: "Amount, pcs."}}/></span>
                            <input ref={this.amountHTML} type="number" min={1} defaultValue={amount}/>
                        </div>
                        <span><TranslatableText dictionary={{ua: "Пріорітет", ru: "Приоритет", gb: "Priority"}}/></span>
                        <select ref={this.priorityHTML} defaultValue={priority}>
                            <option value="lowPriority">Низкий</option>
                            <option value="mediumPriority">Средний</option>
                            <option value="highPriority">Высокий</option>
                        </select>
                    </div>
                    <div className="commentary-zone">
                        <span><TranslatableText dictionary={{ua: "Коментар", ru: "Комментарий", gb: "Commentary"}}/></span>
                        <textarea ref={this.commentaryHTML} defaultValue={commentary}></textarea>
                        <div>
                            <button type="button" onClick={cancelChangedOrder}><TranslatableText dictionary={{ua: "Відмінити", ru: "Отменить", gb: "Cancel"}}/></button>
                            <button type="button" onClick={this.handleSave}><TranslatableText dictionary={{ua: "Зберегти", ru: "Сохранить", gb: "Save"}}/></button>
                        </div>
                    </div>
            </form>
        )
    };
}