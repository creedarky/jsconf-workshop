import React from 'react';
import { storiesOf } from '@storybook/react';

import Footer from 'components/Footer/Footer.jsx';

storiesOf('Footer', module)
  .add('with default state', () =>
    <Footer />
  );
