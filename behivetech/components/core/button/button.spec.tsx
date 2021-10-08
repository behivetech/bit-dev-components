import React from 'react';
import { render } from '@testing-library/react';
import { BasicButton } from './button.composition';

it('should render with the correct children', () => {
    const { getByText } = render(<BasicButton />);
    const rendered = getByText('Click Here');

    expect(rendered).toBeTruthy();
});
