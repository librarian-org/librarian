import React from 'react';
import Translator from '../I18n/Translator';

import { Container, Shortc, ShortcutItem, ShortcutsList } from './styles';

const Shortcuts: React.FC = () => {
  return (
    <Container>
      <ShortcutsList>
        <ShortcutItem>
          <div><Translator path="menu.file.quickSearch" /></div>
          <Shortc>
            <span>Ctrl</span> <span>F</span>
          </Shortc>
        </ShortcutItem>

        <ShortcutItem>
          <div><Translator path="menu.file.newBorrow" /></div>
          <Shortc>
            <span>Ctrl</span> <span>B</span>
          </Shortc>
        </ShortcutItem>

        <ShortcutItem>
          <div><Translator path="menu.file.newPerson" /></div>
          <Shortc>
            <span>Ctrl</span> <span>P</span>
          </Shortc>
        </ShortcutItem>

        <ShortcutItem>
          <div><Translator path="menu.file.newTitle" /></div>
          <Shortc>
            <span>Ctrl</span> <span>T</span>
          </Shortc>
        </ShortcutItem>
        <ShortcutItem>
          <div><Translator path="menu.file.settings" /></div>
          <Shortc>
            <span>Ctrl</span> <span>G</span>
          </Shortc>
        </ShortcutItem>
      </ShortcutsList>
    </Container>
  );
};

export default Shortcuts;
