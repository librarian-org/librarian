import path from 'path';
import Backend from 'i18next-fs-backend';
import i18n, {
  changeLanguage,
  InitOptions,
  loadLanguages,
  t,
  use,
} from 'i18next';

import {
  I18nChangeLanguage,
  I18nCurrentLanguage,
  I18nGetLanguages,
  I18nGetResource,
  I18nInitialize,
  I18nLoad,
  I18nLoadAditional,
  I18nOnLanguageChanged,
  I18nOnLoaded,
  I18nTranslate,
  Language,
} from '../../data/protocols';

export default class I18nAdapter
  implements
    I18nLoad,
    I18nLoadAditional,
    I18nGetLanguages,
    I18nTranslate,
    I18nCurrentLanguage,
    I18nChangeLanguage,
    I18nInitialize,
    I18nOnLoaded,
    I18nOnLanguageChanged,
    I18nGetResource
{
  private getFolder(): string {
    return path.resolve(__dirname, '..', 'renderer', 'main_window', 'locales');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getResource(language: string): any {
    return i18n.getResourceBundle(language, 'common')
  }

  public async initialize(language: string): Promise<void> {
    const folder = this.getFolder();

    const i18nextOptions: InitOptions = {
      backend: {
        loadPath: `${folder}/{{lng}}/{{ns}}.json`,
        addPath: `${folder}/{{lng}}/{{ns}}.missing.json`,
        jsonIndent: 2,
      },
      lng: language,
      interpolation: {
        escapeValue: false,
      },
      saveMissing: true,
      fallbackLng: 'en-US',
      react: {
        wait: false,
      },
      ns: ['common'],
      defaultNS: 'common',
    };

    await use(Backend).init(i18nextOptions);
  }

  public async load(languages: string[]): Promise<void> {
    await Promise.all(
      languages.map(async (language) => {
        await loadLanguages(language);
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async loadAditional(languages: string[]): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let initial: any;
    await Promise.all(
      languages.map(async (item) => {
        await loadLanguages(item, () => {
          const lang = {
            [item]: {
              common: this.getResource(item),
            },
          };
          initial = { ...initial, ...lang };
        });
      })
    );

    return initial;
  }

  public async getLanguages(): Promise<Language[]> {
    const data = Object.entries(i18n.services.resourceStore.data);

    return data.map((item) => {
      const { code, name } = item[1].common as Language;
      return { code, name };
    });
  }

  public translate(key: string): string {
    return t(key);
  }

  public currentLanguage(): string {
    return i18n.language;
  }

  public async changeLanguage(language: string): Promise<void> {
    await changeLanguage(language);
  }

  public onLoaded(): void {
    i18n.on('loaded', () => {
      changeLanguage('en-US');
      i18n.off('loaded');
    });
  }

  public onLanguageChanged(callback: (language: string) => void): void {
    i18n.on('languageChanged', callback);
  }
}
