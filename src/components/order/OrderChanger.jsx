import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";
import "./style.css";

export default class OrderChanger extends React.Component {
    state = {
        material: this.props.changeOrder.material,
        thickness: this.props.changeOrder.thickness,
        amount: this.props.changeOrder.amount,
        priority: this.props.changeOrder.priority,
        commentary: this.props.changeOrder.commentary
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (typeof nextProps.changeOrder != 'undefined') {
            this.setState({
                material: nextProps.changeOrder.material,
                thickness: nextProps.changeOrder.thickness,
                amount: nextProps.changeOrder.amount,
                priority: nextProps.changeOrder.priority,
                commentary: nextProps.changeOrder.commentary
            });
        }
    }
    dropRef = React.createRef()
    handleDrag = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }
    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        alert("Для добавления файлов к списку Вы должны завершить или отменить изменение заказа!")
        if (e.dataTransfer.files) {
          e.dataTransfer.clearData()
        }
      }
    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }
    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }
    handleSave = event => {
        event.preventDefault();
        const { id, file } = this.props.changeOrder;
        const material = this.state.material;
        const thickness = this.state.thickness;
        const amount = this.state.amount;
        const priority = this.state.priority;
        const commentary = this.state.commentary;
        this.props.saveChangedOrder(id, file, material, thickness, amount, priority, commentary);
    }
    render() {
        const { id, file, svg } = this.props.changeOrder;
        const { cancelChangedOrder } = this.props;

        return(
            <form>
                    <div className="leftSide" ref={this.dropRef}>
                        <div className="svg-view" dangerouslySetInnerHTML={{__html: svg}} />
                        <span>№ {id}</span>
                        <span>{file.name}</span>
                    </div>
                    <div className="order-options">
                        <span><TranslatableText dictionary={{ua: "Матеріал", ru: "Материал", gb: "Material"}}/></span>
                        <select
                        onChange={e => this.setState({ material : e.target.value })}
                        value={this.state.material}
                        >
                            <option value="blackST">Ст3</option>
                            <option value="08Х18Н10">304S(08Х18Н10)</option>
                            <option value="20Х23Н18">310S(20Х23Н18)</option>
                        </select>
                        <span><TranslatableText dictionary={{ua: "Товщина, мм", ru: "Толщина, мм", gb: "Thickness, mm"}}/></span>
                        <select
                        onChange={e => this.setState({ thickness : e.target.value })}
                        value={this.state.thickness}
                        >
                            <option value="mm-08">0,8</option>
                            <option value="mm-15">1,5</option>
                            <option value="mm-30">3,0</option>
                            <option value="mm-60">6,0</option>
                            <option value="mm-80">8,0</option>
                        </select>
                        <div className="amount">
                            <span><TranslatableText dictionary={{ua: "Кількість, шт.", ru: "Количество, шт.", gb: "Amount, pcs."}}/></span>
                            <input
                            type="number"
                            min={1}
                            onChange={e => this.setState({ amount : e.target.value })}
                            value={this.state.amount}
                            />
                        </div>
                        <span><TranslatableText dictionary={{ua: "Пріорітет", ru: "Приоритет", gb: "Priority"}}/></span>
                        <select
                        onChange={e => this.setState({ priority : e.target.value })}
                        value={this.state.priority}
                        >
                            <option value="lowPriority">Низкий</option>
                            <option value="mediumPriority">Средний</option>
                            <option value="highPriority">Высокий</option>
                        </select>
                    </div>
                    <div className="commentary-zone">
                        <span><TranslatableText dictionary={{ua: "Коментар", ru: "Комментарий", gb: "Commentary"}}/></span>
                        <textarea
                        onChange={e => this.setState({ commentary : e.target.value })}
                        value={this.state.commentary}
                        />
                        <div>
                            <button type="button" onClick={cancelChangedOrder}><TranslatableText dictionary={{ua: "Відмінити", ru: "Отменить", gb: "Cancel"}}/></button>
                            <button type="button" onClick={this.handleSave}><TranslatableText dictionary={{ua: "Зберегти", ru: "Сохранить", gb: "Save"}}/></button>
                        </div>
                    </div>
            </form>
        )
    };
}