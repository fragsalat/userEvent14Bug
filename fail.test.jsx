import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function pickFields(event) {
  return {which: event.which, charCode: event.charCode, keyCode: event.keyCode, key: event.key};
}

test('should have event.which', async () => {
  render(<input data-testid="input" onKeyDown={event => {
	  console.log('synthetic', pickFields(event), 'native', pickFields(event.nativeEvent));
  }} />);
  
  const input = screen.getByTestId('input');

  console.log('Writing `b`');
  await userEvent.type(input, 'b');

  console.log('Writing `{enter}`');
  await userEvent.type(input, '{enter}');

  console.log('Sending keyDown');
  fireEvent.keyDown(input, {which: 13, keyCode: 13, key: 'Enter'});
});

