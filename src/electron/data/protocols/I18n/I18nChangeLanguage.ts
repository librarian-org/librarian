export interface I18nChangeLanguage {
  /**
   * Changes the current language.
   */
  changeLanguage: (language: string) => Promise<void>;
}
