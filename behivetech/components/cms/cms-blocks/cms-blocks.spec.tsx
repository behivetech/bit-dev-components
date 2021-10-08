import * as React from 'react';
import { render } from '@testing-library/react';
import { BasicCmsBlocks } from './cms-blocks.composition';

it('should render with the correct content', () => {
    const { asFragment } = render(<BasicCmsBlocks />);

    expect(asFragment()).toMatchSnapshot();
});
