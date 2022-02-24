import { I18nAdapter } from './infra/i18n/i18nAdapter';
import Main from './Main';

(async () => {
  try {
    const adapter = new I18nAdapter();

    const main = new Main(adapter);
    await main.initialize();
  } catch (err) {
    console.error("ERROR INITIALIZING APP");
    console.error(err);
    throw err;
  }
})();
