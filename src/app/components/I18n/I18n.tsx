import React from 'react';
import { useTranslation } from 'react-i18next';

const I18n: React.FC = () => {
    const { i18n } = useTranslation();

    function handleChangeLanguage(language: string) {
        i18n.changeLanguage(language);
    }

    const selectedLanguage = i18n.language;

    return (
        <div className='langs-container'>
            <button type='button' onClick={() => handleChangeLanguage('pt-BR')}>
                [pt-br]
            </button>
            |
            <button type='button' onClick={() => handleChangeLanguage('en-US')}>
                [en-us]
            </button>
        </div>
    );
};

export default I18n;
