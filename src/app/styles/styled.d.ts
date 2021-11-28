import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;
      text:  string;

      primary: {
        dark: string;
        light: string;
      }

      secondary: {
        dark: string;
        light: string;
      }

      header: {
        background: string;
      }

      card: {
        background: string;
      }

      input: {
        background: string;
        text: string;
        icon: string;
        placeholder: string;
      }

      tab: {
        active: string;
        background: string;
      }
    }
  }
}
