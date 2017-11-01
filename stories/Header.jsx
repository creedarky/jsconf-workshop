import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from 'components/Header/Header.jsx';

storiesOf('Header', module)
  .add('with default state', () =>
    <Header />
  );
