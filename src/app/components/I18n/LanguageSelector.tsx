import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Language = {
  code: string;
  name: string;
}

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const [languages, setLanguages] = useState<Language[]>([]);

    const selectedLanguage = i18n.language;

    const handleChangeLanguage = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(event.target.value);
    }, []);

    const handleLanguages = () => {
      const data = Object.entries(i18n.services.resourceStore.data);
      const lngs: Language[] = data.map((item) => {
        const l = item[1].common as Language;
        return {code: l.code, name: l.name};
      });

      setLanguages(lngs);
    };

    useEffect(() => {
      handleLanguages();
    }, []);

    return (
        <div className='langs-container'>
          <select value={selectedLanguage} onChange={handleChangeLanguage}>
            {languages.map((item: Language) => (
              <option key={item.code} value={item.code}>{item.name}</option>
            ))}
          </select>
        </div>
    );
};

export default LanguageSelector;
