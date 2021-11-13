import React from 'react';
import { useTranslation } from 'react-i18next';

interface TranslatorProps {
  path: string;
}

const Translator: React.FC<TranslatorProps> = ({ path }) => {
  const { t } = useTranslation();

  return t(path);
}

export default Translator;
