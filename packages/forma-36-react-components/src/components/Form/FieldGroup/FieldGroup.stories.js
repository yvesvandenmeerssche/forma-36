import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { StateDecorator, Store } from '@sambego/storybook-state';
import { host } from 'storybook-host';
import { withInfo } from '@storybook/addon-info';
import CheckboxField from '../../CheckboxField';

import FieldGroup from './FieldGroup';

const store = new Store({
  agreeTerms: 'yes',
});

storiesOf('Components|Form/FieldGroup', module)
  .addDecorator(
    host({
      align: 'center middle',
      cropMarks: false,
      width: 400,
    }),
  )
  .addDecorator(StateDecorator(store))
  .add(
    'default',
    withInfo()(() => (
      <FieldGroup row={boolean('Row', false)}>
        <CheckboxField
          labelText="I agree"
          value="yes"
          helpText="Click if you agree"
          onChange={e => store.set({ agreeTerms: e.target.value })}
          checked={store.state.agreeTerms === 'yes'}
          id="termsCheckboxYes"
        />
        <CheckboxField
          labelText="I don't agree"
          value="no"
          onChange={e => store.set({ agreeTerms: e.target.value })}
          checked={store.state.agreeTerms === 'no'}
          helpText="Click if you don't agree"
          id="termsCheckboxNo"
        />
      </FieldGroup>
    )),
  );
