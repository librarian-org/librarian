export interface Language {
  code: string;
  name: string;
}

export interface I18nGetLanguages {
  /**
   * Get available languages.
   */
  getLanguages: () => Promise<Language[]>;
}
