import React from 'react';

export default class NewsList extends React.Component {
    render() {
        const {news} = this.props;
        let i = 0;

        return (
            <ul>
                {news.map(newe => {
                    const {img, title, description} = newe;
                    i++;

                    return (
                        <li key={i}>
                            <img src={img} alt="img"/>
                            <div>
                                <span>
                                    {title}
                                </span>
                                <span>
                                    {description}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}