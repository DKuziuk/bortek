import React from 'react';

export default class NewsCreator extends React.Component {
    state = {
        img: {},
        title: '',
        description: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const newNewe = this.state;
        this.props.addNewe(newNewe);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={e => this.onChange(e)} type="file" name="img"/>
                    <input onChange={e => this.onChange(e)} type="text" name="title"/>
                    <textarea onChange={e => this.onChange(e)} name="description" cols="30" rows="10"></textarea>
                    <button type="submit">Add newe</button>
                </form>
            </div>
        )
    }
}