import React from 'react';
import "./style.css";
import langUA from "../images/l-ua.png";
import langRU from "../images/l-ru.png";
import langGB from "../images/l-gb.png";

const LanguageContext = React.createContext();
const LanguageConsumer = LanguageContext.Consumer;

export class LanguageProvider extends React.Component {
    state = {
      language: "ru"
    };
  
    updateLanguage = e => this.setState({ language: e.target.id });
  
    render() {
      return (
        <LanguageContext.Provider
          value={{
            language: this.state.language,
            updateLanguage: this.updateLanguage
          }}
        >
          {this.props.children}
        </LanguageContext.Provider>
      );
    }
  }

  export const LanguageChanger = () => {
    return (
        <LanguageConsumer>
            {({ updateLanguage }) => (
                <div className="language fixed-top d-flex flex-column">
                    <img src={langUA} id="ua" alt="" onClick={updateLanguage}/>
                    <img src={langRU} id="ru" alt="" onClick={updateLanguage}/>
                    <img src={langGB} id="gb" alt="" onClick={updateLanguage}/>
                </div>
            )}
        </LanguageConsumer>
    )
  }
  export const TranslatableText = props => (
      <LanguageConsumer>
          {({ language }) => props.dictionary[language]}
      </LanguageConsumer>
  )