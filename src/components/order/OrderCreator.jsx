import React from 'react';
import { TranslatableText } from "../langChanger/index.jsx";
import DragAndDrop from '../dragNDrop/dnd';
import '../dragNDrop/style.css';
import PropTypes from 'prop-types';

export default class OrderCreator extends React.Component {
    static propTypes = {
        submit: PropTypes.func
    }
    static defaultProps = {
        submit: () => {}
    }
    state = {
        files: []
    }
    materialHTML = React.createRef();
    thicknessHTML = React.createRef();
    amountHTML = React.createRef();
    priorityHTML = React.createRef();
    commentaryHTML = React.createRef();

    handleFile = e => {
        console.log(e);
        let fileList = this.state.files;
        if (!e.target.files[0].name) return
        fileList.push(e.target.files[0])
        this.setState({files: fileList})
    }

    handleDrop = (files) => {
        let fileList = this.state.files;
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i])
        }
        this.setState({files: fileList})
    }

    clearZone = () => {
        this.setState({files: []})
    }

    checkCorrectness = (files, amount) => {
        let correctness = true;
        if (files.length === 0) correctness = false;
        files.forEach(file => {
            if (file.name.substr(file.name.length-4, 4).toLowerCase() !== '.dxf') correctness = false;
        });
        if (amount <= 0) correctness = false;
        return correctness;
    }

    handleSubmit = event => {
        event.preventDefault();
        const files = this.state.files;
        const material = this.materialHTML.current.value;
        const thickness = this.thicknessHTML.current.value;
        const amount = this.amountHTML.current.value;
        const priority = this.priorityHTML.current.value;
        const commentary = this.commentaryHTML.current.value;
        if (this.checkCorrectness(files, amount)) {
            this.props.submit(files, material, thickness, amount, priority, commentary);
            this.clearZone();
        } else {
            alert ("Будь ласка, перевірте чи всі файли збережені в форматі .dxf");
        }
    }

    render() {
        return(
            <form action="" onSubmit={this.handleSubmit}>
                    <DragAndDrop handleDrop={this.handleDrop}>
                        <span style={{textAlign: "center"}}><TranslatableText dictionary={{ua: "Перетягніть файл(и) сюди:", ru: "Перетяните файл(ы) сюда:", gb: "Drop file(s) here:"}}/></span>
                        <ul className="fileList">
                        {this.state.files.map((file, i) =>
                            <li key={i}>{file.name}</li>)
                        }
                        </ul>
                        <input 
                            type="file" 
                            style={{display: 'none'}}
                            onChange={e => this.handleFile(e)}
                            ref={fileInput => this.fileInput = fileInput}
                        />
                        <div>
                            <button type="button" onClick={() => this.clearZone()}><TranslatableText dictionary={{ua: "Очистити", ru: "Очистить", gb: "Clear"}}/></button>
                            <button type="button" onClick={() => this.fileInput.click()}><TranslatableText dictionary={{ua: "Обрати файл", ru: "Выбрать файл", gb: "Choose file"}}/></button>
                        </div>
                    </DragAndDrop>
                    <div className="order-options">
                        <span><TranslatableText dictionary={{ua: "Матеріал", ru: "Материал", gb: "Material"}}/></span>
                        <select ref={this.materialHTML} defaultValue="blackST">
                            <option value="blackST">Ст3</option>
                            <option value="08Х18Н10">304S(08Х18Н10)</option>
                            <option value="20Х23Н18">310S(20Х23Н18)</option>
                        </select>
                        <span><TranslatableText dictionary={{ua: "Товщина, мм", ru: "Толщина, мм", gb: "Thickness, mm"}}/></span>
                        <select ref={this.thicknessHTML} defaultValue="mm-08">
                            <option value="mm-08">0,8</option>
                            <option value="mm-15">1,5</option>
                            <option value="mm-30">3,0</option>
                            <option value="mm-60">6,0</option>
                            <option value="mm-80">8,0</option>
                        </select>
                        <div className="amount">
                            <span><TranslatableText dictionary={{ua: "Кількість, шт.", ru: "Количество, шт.", gb: "Amount, pcs."}}/></span>
                            <input ref={this.amountHTML} type="number" min={1} defaultValue={1}/>
                        </div>
                        <span><TranslatableText dictionary={{ua: "Пріорітет", ru: "Приоритет", gb: "Priority"}}/></span>
                        <select ref={this.priorityHTML} defaultValue="lowPriority">
                            <option value="lowPriority">{<TranslatableText dictionary={{ua: "Низький", ru: "Низкий", gb: "Low"}}/>}</option>
                            <option value="mediumPriority">Середній</option>
                            <option value="highPriority">Високий</option>
                        </select>
                    </div>
                    <div className="commentary-zone">
                        <span><TranslatableText dictionary={{ua: "Коментар", ru: "Комментарий", gb: "Commentary"}}/></span>
                        <textarea ref={this.commentaryHTML}></textarea>
                        <button type="submit"><TranslatableText dictionary={{ua: "Додати до замовлення", ru: "Добавить к заказу", gb: "Add to order"}}/></button>
                    </div>
            </form>
        )
    };
}