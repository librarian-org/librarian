export interface I18nLoad {
  /**
   * Loads the languages in memory.
   */
  load: (languages: string[]) => Promise<void>;
}
