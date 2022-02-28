import { I18nChangeLanguage } from './I18nChangeLanguage';
import { I18nCurrentLanguage } from './I18nCurrentLanguage';
import { I18nGetLanguages } from './I18nGetLanguages';
import { I18nGetResource } from './I18nGetResource';
import { I18nInitialize } from './I18nInitialize';
import { I18nLoad } from './I18nLoad';
import { I18nLoadAditional } from './I18nLoadAdditional';
import { I18nOnLanguageChanged } from './I18nOnLanguageChanged';
import { I18nOnLoaded } from './I18nOnLoaded';
import { I18nTranslate } from './I18nTranslate';

export default interface I18nAdapter
  extends I18nChangeLanguage,
    I18nCurrentLanguage,
    I18nGetLanguages,
    I18nGetResource,
    I18nInitialize,
    I18nLoad,
    I18nLoadAditional,
    I18nOnLanguageChanged,
    I18nOnLoaded,
    I18nTranslate {}
