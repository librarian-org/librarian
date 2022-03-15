import I18NextAdapter from '../../../src/electron/infra/i18n/I18NextAdapter';

import i18n from 'i18next';

describe('I18NextAdapter', () => {
  it('should return available languages', async () => {
    const i18NextAdapter = new I18NextAdapter();

    await i18NextAdapter.initialize('en');

    i18n.addResources('en-US', 'common', { code: 'en-US', name: 'English' });
    i18n.addResources('pt-BR', 'common', {
      code: 'pt-BR',
      name: 'Português Brasileiro',
    });

    const languages = await i18NextAdapter.getLanguages();

    expect(languages).toStrictEqual([
      { code: 'en-US', name: 'English' },
      { code: 'pt-BR', name: 'Português Brasileiro' },
    ]);
  });
});
