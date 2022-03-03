export interface I18nLoadAditional {
  /**
   * Loads aditional languages in memory.
   */
  loadAditional: (languages: string[]) => Promise<void>;
}
