import React from 'react';
import NewsCreator from './NewsCreator';
import NewsList from './NewsList';
import testImg1 from "../images/testImg1.jfif";
import testImg2 from "../images/testImg2.jfif";
import testImg3 from "../images/testImg3.jfif";

export default class News extends React.Component {
    state = {
        news: [
            {
                img: testImg3,
                title: 'title3',
                description: 'description3'
            },
            {
                img: testImg2,
                title: 'title2',
                description: 'description2'
            },
            {
                img: testImg1,
                title: 'title1',
                description: 'description1'
            }
        ]
    }

    addNewe = (newNewe) => {
        let copyNews = this.state.news;
        copyNews.unshift(newNewe);
        this.setState({news: copyNews});
    }

    render() {
        return (
            <div className="news">
                <NewsCreator addNewe={this.addNewe} />
                <NewsList news={this.state.news}/>
            </div>
        )
    }
}