export interface I18nInitialize {
  /**
   * Intilize language library.
   */
   initialize: (language: string) => Promise<void>;
}
