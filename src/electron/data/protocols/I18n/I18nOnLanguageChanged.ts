export interface I18nOnLanguageChanged {
  /**
   * Set library On Language Changed listener.
   */
   onLanguageChanged: (callback: (language: string) => void) => void;
}
