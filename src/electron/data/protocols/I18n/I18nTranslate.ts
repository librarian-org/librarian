export interface I18nTranslate {
  /**
   * Returns a translated string according to the key.
   */
  translate: (key: string) => string;
}
