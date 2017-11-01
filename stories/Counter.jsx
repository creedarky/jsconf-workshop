import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Counter from 'components/Counter/Counter.jsx';

const counterProps = count => ({
  count,
  increment: action('Increment'),
  decrement: action('Decrement')
});

storiesOf('Counter', module)
  .add('with count initialized to 0', () =>
    <Counter
      {...counterProps(0)}
    />
  ).add('with count initialized to 123', () =>
    <Counter
      {...counterProps(123)}
    />
  );
