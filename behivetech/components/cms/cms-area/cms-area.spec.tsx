import React from 'react';
import { render } from '@testing-library/react';
import { BasicCmsArea } from './cms-area.composition';

it('should render with the correct text', () => {
    const { asFragment } = render(<BasicCmsArea />);

    expect(asFragment()).toMatchSnapshot();
});
