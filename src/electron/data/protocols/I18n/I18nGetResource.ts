export interface I18nGetResource {
  /**
   * Get library resource bundle.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getResource: (language: string) => any;
}
