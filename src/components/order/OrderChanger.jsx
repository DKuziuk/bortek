import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";
import customSelect from "./customSelect.js";
import "./style.css";

export default class OrderChanger extends React.Component {
    state = {
        amount: this.props.changeOrder.amount,
        commentary: this.props.changeOrder.commentary
    }
    materialHTML = React.createRef();
    thicknessHTML = React.createRef();
    priorityHTML = React.createRef();
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            amount: nextProps.changeOrder.amount,
            commentary: nextProps.changeOrder.commentary
        });
        this.materialHTML.current.value = nextProps.changeOrder.material;
        this.thicknessHTML.current.value = nextProps.changeOrder.thickness;
        this.priorityHTML.current.value = nextProps.changeOrder.priority;
        var oldMenu = document.getElementsByClassName("customed-select");
        for (var n = 0; n < 3; n++) {
            var oldElmnts = oldMenu[n].getElementsByTagName("div");
            for (var i = oldElmnts.length - 1; i >= 0; i--) {
                oldElmnts[i].remove();
            }
        }
        customSelect();
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
        const material = this.materialHTML.current.value;
        const thickness = this.thicknessHTML.current.value;
        const amount = this.state.amount;
        const priority = this.priorityHTML.current.value;
        const commentary = this.state.commentary;
        this.props.saveChangedOrder(id, file, material, thickness, amount, priority, commentary);
    }

    componentDidMount = () => {
        customSelect();
    }

    render() {
        const { id, file, svg, material, thickness, priority } = this.props.changeOrder;
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
                        <div className="customed-select" style={{width: '170px'}}>
                            <select ref={this.materialHTML} defaultValue={material}>
                                <option value="blackST">Ст3</option>
                                <option value="08Х18Н10">304S(08Х18Н10)</option>
                                <option value="20Х23Н18">310S(20Х23Н18)</option>
                            </select>
                        </div>
                        <span><TranslatableText dictionary={{ua: "Товщина, мм", ru: "Толщина, мм", gb: "Thickness, mm"}}/></span>
                        <div className="customed-select" style={{width: '170px'}}>
                            <select ref={this.thicknessHTML} defaultValue={thickness}>
                                <option value="mm-08">0,8</option>
                                <option value="mm-15">1,5</option>
                                <option value="mm-30">3,0</option>
                                <option value="mm-60">6,0</option>
                                <option value="mm-80">8,0</option>
                            </select>
                        </div>
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
                        <div className="customed-select" style={{width: '170px'}}>
                            <select ref={this.priorityHTML} defaultValue={priority}>
                                <option value="lowPriority">!</option>
                                <option value="mediumPriority">! !</option>
                                <option value="highPriority">! ! !</option>
                            </select>
                        </div>
                    </div>
                    <div className="commentary-zone">
                        <span><TranslatableText dictionary={{ua: "Коментар", ru: "Комментарий", gb: "Commentary"}}/></span>
                        <textarea
                        onChange={e => this.setState({ commentary : e.target.value })}
                        value={this.state.commentary}
                        />
                        <div>
                            <button style={{marginRight: '5px'}} type="button" onClick={cancelChangedOrder}><TranslatableText dictionary={{ua: "Відмінити", ru: "Отменить", gb: "Cancel"}}/></button>
                            <button type="button" onClick={this.handleSave}><TranslatableText dictionary={{ua: "Зберегти", ru: "Сохранить", gb: "Save"}}/></button>
                        </div>
                    </div>
            </form>
        )
    };
}