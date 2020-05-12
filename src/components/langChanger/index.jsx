import React from 'react';
import "./style.css";
// import langUA from "../images/l-ua.png";
// import langRU from "../images/l-ru.png";
// import langGB from "../images/l-gb.png";
// import LangIcon from "../images/Lang.svg";

const LanguageContext = React.createContext();
const LanguageConsumer = LanguageContext.Consumer;
let langSelected = "ua";

export class LanguageProvider extends React.Component {
    state = {
      language: "ua"
    };
  
    updateLanguage = e => {this.setState({ language: e.target.id }); langSelected = e.target.id;};
  
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
                <div className="language">
                    <b id="ua" alt="Ukrainian" className={langSelected === "ua" ? "lang-selected" : "" } onClick={updateLanguage}>UA</b>
                    <b id="ru" alt="Russian" className={langSelected === "ru" ? "lang-selected" : "" } onClick={updateLanguage}>RU</b>
                    <b id="gb" alt="English" className={langSelected === "gb" ? "lang-selected" : "" } onClick={updateLanguage}>EN</b>
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