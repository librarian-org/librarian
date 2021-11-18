import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();

    function handleChangeLanguage(event: ChangeEvent<HTMLSelectElement>) {
      i18n.changeLanguage(event.target.value);
    }

    const selectedLanguage = i18n.language;

    console.log('i18next.languages', i18n);
    return (
        <div className='langs-container'>
          <select value={selectedLanguage} onChange={handleChangeLanguage}>
          {i18n.languages.map((item) => {
            <option value='pt-BR'>{item}</option>
          })}

            <option value='pt-BR'>Português</option>
            <option value='en-US'>English</option>
          </select>
        </div>
    );
};

export default LanguageSelector;
