import "./styles/fonts.css";
import "./styles/main.css";
// import bannerImage from "../images/laser-cutting.jpg";
// import { TranslatableText } from "../langChanger/index.jsx";
import ReactPageScroller from "react-page-scroller";
import React from 'react';
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from "./FourthComponent";
// import FifthComponent from "./FifthComponent";
import { Pager } from "react-bootstrap";

export default class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = { currentPage: 0  };
    }
    handlePageChange = number => {
      this.setState({ currentPage: number }); // set currentPage number, to reset it from the previous selected.
    };
    getPagesNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= 4; i++) {
            pageNumbers.push(
            <Pager.Item 
            key={i} 
            className={this.state.currentPage === i-1 ? "selectedPage" : "" } 
            eventKey={i - 1} 
            onSelect={this.handlePageChange}>
                {i}
            </Pager.Item>,
            );
        }

        return [...pageNumbers];
    };
    render() {
        const pagesNumbers = this.getPagesNumbers();
        return (
            <div>
                    <ReactPageScroller
                    pageOnChange={this.handlePageChange}
                    customPageNumber={this.state.currentPage}
                    animationTimer={600}
                    animationTimerBuffer={0}
                    renderAllPagesOnFirstRender={true}
                    >
                        <FirstComponent />
                        <SecondComponent />
                        <ThirdComponent />
                        <FourthComponent />
                        {/* <FifthComponent /> */}
                    </ReactPageScroller>
                    <Pager className="pagination-additional-class" bsSize="large">
                        {pagesNumbers}
                    </Pager>
            </div>
        );
    }
}