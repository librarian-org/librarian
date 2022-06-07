import I18NextAdapter from './infra/i18n/I18NextAdapter';
import DefaultResources from './infra/resources/DefaultResources';
import LibrarianWindow from './LibrarianWindow';
import Main from './Main';

(async () => {
  try {
    const resources = new DefaultResources();

    const adapter = new I18NextAdapter();
    await adapter.initialize(resources.getSelectedLanguage());
    await adapter.load(resources.getLanguages());

    const win = new LibrarianWindow(resources);

    const main = new Main(resources, adapter, win);
    await main.initialize();
  } catch (err) {
    console.error("ERROR INITIALIZING APP");
    console.error(err);
    throw err;
  }
})();
